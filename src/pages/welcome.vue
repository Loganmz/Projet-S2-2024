<template>
  <div class="welcome flex flex-col items-center justify-center">
    
    <!-- <img src="@/assets/logo.png" alt="PuryMind Logo" class="max-w-100px mb-6" /> -->
    <h1 class="text-2xl font-bold mb-4">Welcome to PuryMind</h1>
    <p class="text-lg mb-4">Fournir le meilleur outil pour vous aider à retrouver votre sérénité et vous rappeler les bons moments.</p>
        <Button url="/Inscription" text="Commencer" />

    
    <p class="text-sm">Vous avez déjà un compte? <router-link to="/Connexion" class="text-blue-500">se connecter</router-link></p>
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

