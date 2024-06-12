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
      <h1 class="text-center text-4xl font-bold mb-4">Bienvenue sur PuryMind</h1>
      <p class="text-center text-gray-500 mb-8">
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
      <div class="w-full">
        <button @click="doLoginOAuth" id="g-signin2">Connexion avec Google</button>
      </div>
      <p class="text-center text-gray-500 mt-8">
        Vous avez déjà un compte ?
        <router-link to="/Connexion" class="text-black">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>
