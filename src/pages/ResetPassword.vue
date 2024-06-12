<!-- <script setup lang="ts">
import { ref } from 'vue'
import { resetPassword } from '@/backend'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()
const route = useRoute()
const errorMessage = ref('')
const successMessage = ref('')

const data = ref({
  token: route.query.token || '',
  newPassword: ''
})

const handlePasswordReset = async () => {
  if (data.value.newPassword === '') {
    errorMessage.value = '⚠ Veuillez entrer un nouveau mot de passe'
  } else {
    try {
      await resetPassword(data.value.token.toString(), data.value.newPassword)
      successMessage.value = 'Votre mot de passe a été réinitialisé avec succès.'
      errorMessage.value = ''
      router.push('/Connexion')
    } catch (error) {
      errorMessage.value = 'Erreur lors de la réinitialisation du mot de passe.'


      successMessage.value = ''
    }
  }
}
</script>

<template>
  <div class="px-5 flex flex-col gap-5">
    <div class="flex flex-col gap-8">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">Nouveau mot de passe</h1>
    </div>
    <div class="container mx-auto mt-2">
      <form class="max-w-md mx-auto text-black" @submit.prevent="handlePasswordReset">
        <div class="mb-5">
          <label for="newPassword" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <input
            type="password"
            id="newPassword"
            v-model="data.newPassword"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="8 caractères minimum"
          />
        </div>
        <p class="text-red-500 mb-2">{{ errorMessage }}</p>
        <p class="text-green-500 mb-2">{{ successMessage }}</p>
        <div class="flex justify-center mb-2 lg:justify-center lg:pt-8">
          <Button @click="handlePasswordReset" url="" text="Réinitialiser" />
        </div>
      </form>
    </div>
  </div>
</template> -->

<template></template>