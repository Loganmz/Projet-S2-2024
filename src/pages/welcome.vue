<template>
  <div class="welcome flex flex-col items-center justify-center">
    
    <!-- <img src="@/assets/logo.png" alt="PuryMind Logo" class="max-w-100px mb-6" /> -->
    <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl text-sky-500 text-center">Bienvenue sur Purymind !</h1>
      <p class="text-center text-black my-8">
        Retrouvez votre sérénité pour collectionner les bons moments
      </p>
        <Button url="/AvantConnexion" text="Commencer" />

    
    <div class="flex justify-center my-4 text-sm">
          <p>Vous êtes deja inscrit ?</p>
          <RouterLink to="/Connexion" class="text-sky-500">Connectez-vous ici !</RouterLink>
        </div>
  </div>
  
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

import { useHead } from '@unhead/vue'
useHead({
  title: 'Welcome | PuryMind',
    meta: [
        {
        name: 'description',
        content: 'Fournir le meilleur outil pour vous aider à retrouver votre sérénité et vous rappeler les bons moments.'
        }
    ]
})

</script>

