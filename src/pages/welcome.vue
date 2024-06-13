<script setup lang="ts">
import Button from '@/components/Button.vue'
import IconLogo from '@/components/icons/IconLogoloading.vue'
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


<template>
  <section class="container h-screen grid grid-rows-4 gradient-bg">
    <div class="row-start-2">
      <IconLogo class="w-24 h-24 mx-auto" />
    </div>
  <div class="welcome flex flex-col row-start-3 items-center justify-center">
      
    <h1 class="flex justify-center font-Marigny font-bold text-4xl text-white text-center">Bienvenue sur Purymind !</h1>
      <p class="text-center text-white text-base font-extralight my-8">
        Retrouvez votre sérénité pour collectionner les bons moments
      </p>
        <Button url="/AvantConnexion" text="Commencer" />

    
    <div class="flex justify-center text-center text-white my-4 text-sm">
          <p class="px-1">Vous êtes deja inscrit ?</p>
          <RouterLink to="/Connexion" class="text-white border-b ">Connectez-vous ici !</RouterLink>
        </div>
  </div>
  </section>
</template>


