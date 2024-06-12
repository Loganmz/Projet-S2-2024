<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import PocketBase from 'pocketbase'
import { formatDate } from '@/helper'

// Définir les références pour la citation du jour, l'auteur et la date
const dailyQuote = ref('')
const dailyAuthor = ref('')
const dailyDate = ref('')
const dailyQuoteId = ref('')

// Définir les références pour les trois citations récentes
const recentQuotes = ref<{quote: string, author: string, date: string, id: string, type: string}[]>([])

// Références pour la nouvelle citation
const newQuote = ref<{quote: string, author: string, date: string}>({ quote: '', author: '', date: '' })

// Initialiser PocketBase avec l'URL de votre instance
const pb = new PocketBase('http://127.0.0.1:8090')

// Variable pour suivre le type de filtrage actif
const filterType = ref<'user' | 'api' | 'all'>('all')

// Fonction pour changer le type de filtrage
const setFilterType = (type: 'user' | 'api' | 'all') => {
    filterType.value = type;
    console.log('Filter type set to:', filterType.value);
}

// Fonction pour ajouter une nouvelle citation
const addNewQuote = async () => {
    try {
        // Envoyer la nouvelle citation à PocketBase
        const record = await pb.collection('citation').create({
            quote: newQuote.value.quote,
            author: newQuote.value.author,
            date: newQuote.value.date,
            type: 'user' // Définir le type comme "user"
        })
        console.log('New quote created:', record)

        // Ajouter la nouvelle citation à la liste des citations récentes
        const newRecentQuote = {
            quote: record.quote,
            author: record.author,
            date: record.date,
            id: record.id, // Ajoutez l'ID ici pour permettre la suppression
            type: record.type // Ajoutez le type ici
        };
        recentQuotes.value.unshift(newRecentQuote);

        // Vérifier si la citation ajoutée correspond au type de filtrage actif
        if (filterType.value === 'all' || filterType.value === newRecentQuote.type) {
            // Si oui, mettre à jour les citations filtrées
            filteredQuotes.value.unshift(newRecentQuote);
        }

        // Réinitialiser le formulaire
        newQuote.value = { quote: '', author: '', date: '' }
    } catch (error) {
        console.error('Error adding new quote:', error)
    }
}

// Fonction pour supprimer une citation
const deleteQuote = async (id: string) => {
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
        const response = await axios.get('api/api/today')
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

    } catch (error) {
        console.error('Error:', error)
    }
})

// Calcul des citations filtrées en fonction du type sélectionné
const filteredQuotes = computed(() => {
    console.log('Filtering quotes with type:', filterType.value);
    if (filterType.value === 'all') {
        return recentQuotes.value;
    } else {
        return recentQuotes.value.filter(quote => quote.type === filterType.value);
    }
});


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
        
        <!-- Boutons de filtrage -->
        <div class="flex justify-center mb-4 space-x-4">
            <button @click="setFilterType('all')" :class="{ 'bg-blue-500': filterType === 'all', 'bg-gray-300': filterType !== 'all' }" class="px-4 py-2 rounded-lg text-white font-bold focus:outline-none">Toutes</button>
<button @click="setFilterType('user')" :class="{ 'bg-blue-500': filterType === 'user', 'bg-gray-300': filterType !== 'user' }" class="px-4 py-2 rounded-lg text-white font-bold focus:outline-none">Utilisateur</button>
<button @click="setFilterType('api')" :class="{ 'bg-blue-500': filterType === 'api', 'bg-gray-300': filterType !== 'api' }" class="px-4 py-2 rounded-lg text-white font-bold focus:outline-none">API</button>


        </div>
        
        <!-- Liste des citations filtrées -->
        <ul v-if="filteredQuotes.length > 0">
    <li v-for="(quote, index) in filteredQuotes" :key="index" class="bg-gray-100 p-4 my-2 rounded-lg shadow">
        <div class="flex justify-between items-center">
            <div>
                <p class="text-base">"{{ quote.quote }}" - {{ quote.author }}</p>
                <p class="text-sm text-gray-600">{{ formatDate(quote.date) }}</p>
            </div>
            <button @click="deleteQuote(quote.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Supprimer</button>
        </div>
    </li>
</ul>
<p v-else>Pas de citations récentes disponibles</p>

        <p v-else>Pas de citations récentes disponibles</p>

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


