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
</script>

<template>
<h1 class="text-3xl font-bold m-8 text-center lg:text-4xl">Créer un souvenir</h1>
<div class="flex justify-center lg:justify-center lg:pt-8">
    <Button @click="createSouvenir" url="" text="Créer un souvenir" />    
</div>

<!-- Ajoutez les classes CSS pour rendre le composant CapturePhoto en plein écran -->
<div v-if="showCapturePhoto" class="fixed inset-0 z-50">
  <CapturePhoto />
</div>

</template>