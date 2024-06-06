<script setup>
import { ref, onMounted } from 'vue';

const quote = ref("Loading...");
const author = ref("");
const isFullscreen = ref(false);

const loadQuote = async () => {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = encodeURIComponent('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
        const response = await fetch(proxyUrl + targetUrl);
        const data = await response.json();
        const quoteData = JSON.parse(data.contents);
        quote.value = quoteData.quoteText;
        author.value = quoteData.quoteAuthor || "Unknown";

        // Enregistrement des données dans la base de données Pocket
        await saveQuote(quoteData.quoteText, author.value);
    } catch (error) {
        quote.value = "La citation n'a pas pu être chargée. Veuillez réessayer plus tard.";
        author.value = "";
    }
};

const saveQuote = async (quoteText, quoteAuthor) => {
    try {
        const params = new URLSearchParams({
            citation: quoteText,
            auteur: quoteAuthor,
            date: new Date().toISOString()
        });

        const response = await fetch(`http://127.0.0.1:8090?${params.toString()}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Traitez la réponse si nécessaire
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de la citation:", error);
    }
};

onMounted(async () => {
    await loadQuote();
    setInterval(loadQuote, 24 * 60 * 60 * 1000); // Charge une nouvelle citation toutes les 24 heures
});

const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
};
</script>

<template>
    <h1 class="text-2xl font-bold mb-4 p-6">Citation du jour</h1>
    <div class="flex items-start min-h-screen bg-gray-100">
      <div 
        :class="[
          'bg-black text-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-500 mx-6',
          isFullscreen.value ? 'w-screen h-screen' : 'max-w-3xl w-full',
        ]"
        @click="toggleFullscreen"
      >
        <p class="text-lg italic mb-4">"{{ quote }}"</p>
        <p class="text-md font-semibold text-gray-300">-{{ author }}</p>
      </div>
    </div>
</template>