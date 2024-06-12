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

<!-- Ajoutez les classes CSS pour rendre le composant CapturePhoto en plein écran -->
<div showCapturePhoto class="fixed inset-0 z-50">
  <CapturePhoto />
</div>

</template>