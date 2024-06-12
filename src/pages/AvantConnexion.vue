<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import { pb } from '@/backend'

const router = useRouter();

const doLoginOAuth = async () => {
    try {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        // Si l'authentification réussit, rediriger vers l'index
        router.push('/');
    } catch (error) {
        console.error('Authentication failed', error);
    }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="py-4 px-4">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl text-sky-500 text-center">Bienvenue sur Purymind !</h1>
      <p class="text-center text-black my-8">
        Retrouvez votre sérénité pour collectionner les bons moments
      </p>
      <div class="flex justify-center">
        <Button url="/Inscription" text="Continuer avec une email" />
      </div>
      <div class="flex items-center my-4">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-4 text-gray-500">Ou</span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>
      
      <div class="w-full flex justify-center">
        <button class="bg-black px-6 py-3 text-base inline-flex items-center gap-2 text-white border-2 font-bold rounded-lg transition duration-300 ease-in-out" @click="doLoginOAuth" id="g-signin2">Connexion avec Google</button>
      </div>
      <div class="flex justify-center my-4 text-sm">
          <p>Vous êtes deja inscrit ?</p>
          <RouterLink to="/Connexion" class="text-sky-500">Connectez-vous ici !</RouterLink>
        </div>
    </div>
  </div>
</template>
