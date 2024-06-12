<!-- <script setup lang="ts">
import { ref } from 'vue'
import { requestPasswordReset } from '@/backend'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://localhost:8090'); // Remplacez par l'URL correcte de votre backend PocketBase

const router = useRouter()
const errorMessage = ref('')
const successMessage = ref('')

const data = ref({
  email: ''
})

const handleResetRequest = async () => {
  if (data.value.email === '') {
    errorMessage.value = '⚠ Veuillez entrer votre email'
  } else {
    try {
      await requestPasswordReset(data.value.email)
      successMessage.value = 'Un email de réinitialisation a été envoyé.'
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Erreur lors de la demande de réinitialisation de mot de passe';
      successMessage.value = ''
    }
  }
}
</script>

<template>
  <div class="px-5 flex flex-col gap-5">
    <div class="flex flex-col gap-8">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">Réinitialiser le mot de passe</h1>
    </div>
    <div class="container mx-auto mt-2">
      <form class="max-w-md mx-auto text-black" @submit.prevent="handleResetRequest">
        <div class="mb-5">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="data.email"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="ex : lucas.dupont@gmail.com"
          />
        </div>
        <p class="text-red-500 mb-2">{{ errorMessage }}</p>
        <p class="text-green-500 mb-2">{{ successMessage }}</p>
        <div class="flex justify-center mb-2 lg:justify-center lg:pt-8">
          <Button @click="handleResetRequest" url="" text="Envoyer" />
        </div>
        <div class="flex justify-center mb-4 text-sm">
          <RouterLink to="/Connexion" class="text-sky-500">Retour à la connexion</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template> -->


<template></template>