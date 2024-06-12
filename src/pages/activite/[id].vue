<script setup lang="ts">
import { pb } from '@/backend'
import { ref } from 'vue'
import { useRoute } from 'vue-router/auto'
import Button from '@/components/Button.vue';

const route = useRoute('/activite/[id]')
console.log('id :', route.params.id)

const uneActivite = await pb.collection('activite').getOne(route.params.id)

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
function createsouvenir() {
    console.log('Créer un souvenir')
}
</script>

<template>
<h1 class="text-3xl font-bold m-8 text-center lg:text-4xl">{{uneActivite.nom_activite}}</h1>
<p class="m-5">{{ uneActivite.description }}</p>
<img src="/public\img\voirSouvenir.png" alt="Créer un souvenir" class="w-full h-auto mt-4" />
<div class="flex justify-center lg:justify-center lg:pt-8 mb-12">
    <Button @click="createsouvenir" url="/creerSouvenir" :text="uneActivite.nom_activite" />    
</div>


</template>