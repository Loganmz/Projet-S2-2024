<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

// Interface pour googleUser
interface GoogleUser {
  getAuthResponse(): { id_token: string }
}

const router = useRouter()

onMounted(() => {
  const onGoogleSignIn = (googleUser: GoogleUser) => {
    const id_token = googleUser.getAuthResponse().id_token
    fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: id_token })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          router.push('/') // Redirige après une inscription réussie
        } else {
          alert("Erreur d'inscription avec Google")
        }
      })
  }

  const onFailure = (error: any) => {
    console.log(error)
  }

  if (typeof gapi !== 'undefined' && gapi.signin2) {
    gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: onGoogleSignIn,
      onfailure: onFailure
    })
  } else {
    console.error('gapi.signin2 is not available.')
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="py-4 px-4">
      <h1 class="text-center text-4xl font-bold mb-4">Bienvenue sur PuryMind</h1>
      <p class="text-center text-gray-500 mb-8">
        Retrouvez votre sérénité pour collectionner les bons moments
      </p>
      <div class="flex justify-center">
        <Button url="/inscription" text="Continuer avec une email" />
      </div>
      <div class="flex items-center my-4">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-4 text-gray-500">Ou</span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>
      <div class="w-full">
        <div id="g-signin2"></div>
      </div>
      <p class="text-center text-gray-500 mt-8">
        Vous avez déjà un compte ?
        <router-link to="/Connexion" class="text-black">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>
