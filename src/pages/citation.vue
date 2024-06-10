<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'
import { formatDate } from '@/helper';

// Définir les références pour la citation du jour, l'auteur et la date
const dailyQuote = ref('')
const dailyAuthor = ref('')
const dailyDate = ref('')
const dailyQuoteId = ref('')

// Définir les références pour les trois citations récentes
const recentQuotes = ref<{quote: string, author: string, date: string}[]>([])

// Initialiser PocketBase avec l'URL de votre instance
const pb = new PocketBase('http://localhost:8090')

onMounted(async () => {
    try {
        // Récupérer la citation du jour
        const response = await axios.get('api/api/today')
        dailyQuote.value = response.data[0].q
        dailyAuthor.value = response.data[0].a

        // Obtenir la date actuelle
        const today = new Date()
        dailyDate.value = today.toISOString().split('T')[0] // Format YYYY-MM-DD

        // Envoyer la citation, l'auteur et la date à PocketBase
        const record = await pb.collection('citation').create({
            quote: dailyQuote.value,
            author: dailyAuthor.value,
            date: dailyDate.value
        })
        dailyQuoteId.value = record.id // Stocker l'ID de la citation du jour
        console.log('Record created:', record)

        // Récupérer les trois citations les plus récentes de PocketBase, en excluant celle du jour
        const recentRecords = await pb.collection('citation').getList(1, 4, {
            sort: '-date',
            filter: `id != "${dailyQuoteId.value}"`
        })
        recentQuotes.value = recentRecords.items.slice(1, 4).map(item => ({
            quote: item.quote,
            author: item.author,
            date: item.date
        }))
        console.log('Recent quotes:', recentQuotes.value)

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
        <div v-if="recentQuotes.length > 0">
            <ul>
                <li v-for="(quote, index) in recentQuotes" :key="index" class="bg-gray-100 p-4 my-2 rounded-lg shadow ">
                    <p class="text-base">"{{ quote.quote }}" - {{ quote.author }}</p>
                    <p class="text-sm text-gray-600">{{formatDate(quote.date) }}</p>
                </li>
            </ul>
        </div>
        <p v-else>Pas de citations récentes disponibles</p>
    </main>
</template>
