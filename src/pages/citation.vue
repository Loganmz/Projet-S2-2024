<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';


const citation = ref(null);
const auteur = ref(null);

onMounted(() => {
    getCitation();
});




const getCitation = async () => {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://zenquotes.io/api/today';
        const response = await axios.get(proxyUrl + targetUrl);
        const { data } = response;
        citation.value = data[0].q;
        auteur.value = data[0].a;
        console.log(data);
        console.log(citation.value, auteur.value);
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="bg-gray-100 flex justify-center items-center min-h-screen">
        <div class="max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h1 class="text-lg font-bold mb-4">Citation du jour</h1>
            <p class="text-lg text-red-950">{{ citation }} - {{ auteur }}</p>
        </div>
    </div>
</template>