<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

// Définir les références pour la citation, l'auteur et la date
const dailyQuote = ref('')
const dailyAuthor = ref('')
const dailyDate = ref('')

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
        console.log('Record created:', record)

    } catch (error) {
        console.error('Error:', error)
    }
})
</script>

<template>
    <main class="p-4">
        <h1 class="text-2xl font-bold py-4 text-center">Quote of the day</h1>
        <div v-if="dailyQuote" class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <p class="text-base">"{{ dailyQuote }}" - {{ dailyAuthor }}</p>
        </div>
        <p v-else>La citation n'a pas été chargée</p>
    </main>
</template>
