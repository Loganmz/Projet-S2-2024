<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://localhost:5173/');
import CapturePhoto from '@/components/CapturePhoto.vue';
import Button from '@/components/Button.vue';

// Ajoutez cette ligne pour créer une variable réactive pour contrôler l'affichage du composant CapturePhoto
const showCapturePhoto = ref(false);

// Ajoutez cette fonction pour définir showCapturePhoto à true lorsque le bouton est cliqué
const createSouvenir = () => {
  showCapturePhoto.value = true;
};

import { useHead } from '@unhead/vue'
useHead({
  title: 'Créer un souvenir | PuryMind',
    meta: [
        {
        name: 'description',
        content: 'Créez vos propres souvenirs et capturez les meilleurs moments de vos journées.'
        }
    ]
})

</script>

<template>
<h1 class="text-3xl font-bold m-8 text-center lg:text-4xl">Créer un souvenir</h1>
<p class="m-5">Ici, vous pouvez créer vos propres souvenirs et capturer les meilleurs moments de vos journées.</p>
<img src="/public\img\voirSouvenir.png" alt="Créer un souvenir" class="w-full h-auto mt-4" />
<div class="flex justify-center lg:justify-center lg:pt-8 mb-12">
    <Button @click="createSouvenir" url="" text="Créer un souvenir" />    
</div>

<!-- Ajoutez les classes CSS pour rendre le composant CapturePhoto en plein écran -->
<div v-if="showCapturePhoto" class="fixed inset-0 z-50">
  <CapturePhoto />
</div>

</template>