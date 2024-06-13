<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'
import { formatDate } from '@/helper'

// Définir les références pour la citation du jour, l'auteur et la date
const dailyQuote = ref('')
const dailyAuthor = ref('')
const dailyDate = ref('')
const dailyQuoteId = ref('')

// Définir les références pour les trois citations récentes
const recentQuotes = ref<{quote: string, author: string, date: string, id: string, type: string}[]>([])

// Références pour les citations créées par les utilisateurs
const userQuotes = ref<{quote: string, author: string, date: string, id: string}[]>([])

// Références pour la nouvelle citation
const newQuote = ref<{quote: string, author: string, date: string}>({ quote: '', author: '', date: '' })

// Initialiser PocketBase avec l'URL de votre instance
const pb = new PocketBase('https://app-purymind.noelie-talhouarn.fr:443/')

// Fonction pour ajouter une nouvelle citation
const addNewQuote = async () => {
    try {
        // Envoyer la nouvelle citation à PocketBase dans la collection "creer_citation"
        const record = await pb.collection('creer_citation').create({
            quote_creer: newQuote.value.quote,
            author_creer: newQuote.value.author,
            date_citation_creer: newQuote.value.date
        })
        console.log('New quote created:', record)

        // Ajouter la nouvelle citation à la liste des citations créées par les utilisateurs
        const newUserQuote = {
            quote: record.quote_creer,
            author: record.author_creer,
            date: record.date_citation_creer,
            id: record.id
        };
        userQuotes.value.unshift(newUserQuote);

        // Réinitialiser le formulaire
        newQuote.value = { quote: '', author: '', date: '' }
    } catch (error) {
        console.error('Error adding new quote:', error)
    }
}

// Fonction pour récupérer les citations créées par les utilisateurs
const fetchUserQuotes = async () => {
    try {
        const userRecords = await pb.collection('creer_citation').getList(1, 10, {
            sort: '-date_citation_creer',
        })
        userQuotes.value = userRecords.items.map(item => ({
            quote: item.quote_creer,
            author: item.author_creer,
            date: item.date_citation_creer,
            id: item.id
        }))
        console.log('User quotes:', userQuotes.value)
    } catch (error) {
        console.error('Error fetching user quotes:', error)
    }
}

// Fonction pour supprimer une citation
const deleteQuote = async (id: string) => {
    try {
        await pb.collection('creer_citation').delete(id)
        console.log(`Quote with ID ${id} deleted`)

        // Mettre à jour la liste des citations créées par les utilisateurs
        userQuotes.value = userQuotes.value.filter(quote => quote.id !== id)
    } catch (error) {
        console.error('Error deleting quote:', error)
    }
}
const deleteCitation = async (id: string) => {
    try {
        await pb.collection('citation').delete(id)
        console.log(`Quote with ID ${id} deleted`)

        // Mettre à jour la liste des citations récentes
        recentQuotes.value = recentQuotes.value.filter(quote => quote.id !== id)
    } catch (error) {
        console.error('Error deleting quote:', error)
    }
}

onMounted(async () => {
    try {
        // Récupérer la citation du jour
        const response = await axios.get('https://api-purymind.noelie-talhouarn.fr/api/today')
        dailyQuote.value = response.data[0].q
        dailyAuthor.value = response.data[0].a

        // Obtenir la date actuelle
        const today = new Date()
        dailyDate.value = today.toISOString().split('T')[0] // Format YYYY-MM-DD

        // Vérifier si la citation du jour existe déjà dans PocketBase
        const existingRecord = await pb.collection('citation').getList(1, 1, {
            filter: `quote = "${dailyQuote.value}" && author = "${dailyAuthor.value}" && date = "${dailyDate.value}"`
        })

        if (existingRecord.items.length === 0) {
            // Si la citation du jour n'existe pas, l'ajouter
            const record = await pb.collection('citation').create({
                quote: dailyQuote.value,
                author: dailyAuthor.value,
                date: dailyDate.value,
                type: 'api' // Définir le type comme "api"
            })
            dailyQuoteId.value = record.id // Stocker l'ID de la citation du jour
            console.log('Record created:', record)
        } else {
            dailyQuoteId.value = existingRecord.items[0].id // Utiliser l'ID de la citation existante
            console.log('Record already exists:', existingRecord.items[0])
        }

        // Récupérer les trois citations les plus récentes de PocketBase, en excluant celle du jour
        const recentRecords = await pb.collection('citation').getList(1, 4, {
            sort: '-date',
            filter: `id != "${dailyQuoteId.value}"`,
        })
        recentQuotes.value = recentRecords.items.slice(0, 3).map(item => ({
            quote: item.quote,
            author: item.author,
            date: item.date,
            id: item.id, // Assurez-vous d'inclure l'ID ici aussi
            type: item.type // Ajoutez le type ici
        }))
        console.log('Recent quotes:', recentQuotes.value)

        // Récupérer les citations créées par les utilisateurs
        await fetchUserQuotes()

    } catch (error) {
        console.error('Error:', error)
    }
})

import { useHead } from '@unhead/vue'
useHead({
  title: 'Citation | PuryMind',
  meta: [
    {
      name: 'description',
      content: 'Découvrez une citation inspirante chaque jour et consultez les citations récentes.'
    }
  ]
})
</script>





<template>
  <main class="p-4">
    <h1 class="text-2xl font-bold py-4 text-center">Citation du jour</h1>
    <div v-if="dailyQuote" class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <p class="text-lg">"{{ dailyQuote }}" - {{ dailyAuthor }}</p>
    </div>
    <p v-else>La citation n'a pas été chargée</p>

    <h2 class="text-xl font-bold py-4 text-center">Citations récentes</h2>
    
    <!-- Liste des citations récentes -->
    <ul v-if="recentQuotes.length > 0">
      <li v-for="(quote, index) in recentQuotes" :key="index" class="bg-gray-100 p-4 my-2 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-base">"{{ quote.quote }}" - {{ quote.author }}</p>
            <p class="text-sm text-gray-600">{{ formatDate(quote.date) }}</p>
          </div>
          <button @click.prevent="deleteCitation(quote.id)" class="text-red-500 font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline">Supprimer</button>
        </div>
      </li>
    </ul>
    <p v-else>Pas de citations récentes disponibles</p>

    <h2 v-if="userQuotes.length > 0" class="text-xl font-bold py-4 text-center">Citations créées par les utilisateurs</h2>
    <ul v-if="userQuotes.length > 0">
      <li v-for="(quote, index) in userQuotes" :key="index" class="bg-gray-100 p-4 my-2 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-base">"{{ quote.quote }}" - {{ quote.author }}</p>
            <p class="text-sm text-gray-600">{{ formatDate(quote.date) }}</p>
          </div>
          <button @click.prevent="deleteQuote(quote.id)" class="text-red-500 font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline">Supprimer</button>
        </div>
      </li>
    </ul>
    <p v-else>Pas de citations créées par les utilisateurs disponibles</p>

    <h2 class="text-xl font-bold py-4 text-center">Ajouter une nouvelle citation</h2>
    <form @submit.prevent="addNewQuote" class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="quote">Citation</label>
        <input v-model="newQuote.quote" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quote" type="text" placeholder="Entrez la citation">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Auteur</label>
        <input v-model="newQuote.author" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Entrez l'auteur">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="date">Date</label>
        <input v-model="newQuote.date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter</button>
    </form>

    
  </main>
</template>