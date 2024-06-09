<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from '@/backend'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()
const errorMessage = ref('')

const data = ref({
  usernameOrEmail: '',
  password: ''
})

const handleValidation = async () => {
  if (data.value.usernameOrEmail === '' || data.value.password === '') {
    errorMessage.value = '⚠ Veuillez remplir tous les champs'
  } else {
    try {
      await signIn({ email: data.value.usernameOrEmail, password: data.value.password })
      router.push('/') // redirection après connexion réussie
    } catch (error) {
      errorMessage.value = error.message
    }
  }
}

console.log('coucou' + data.value)
</script>

<template>
  <div class="px-5 flex flex-col gap-5">
    <div class="flex flex-col gap-8">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">Connexion</h1>
    </div>
    <div class="container mx-auto mt-2">
      <form class="max-w-md mx-auto text-black" @submit.prevent="handleValidation">
        <div class="mb-5">
          <label for="usernameOrEmail" class="block text-sm font-medium text-gray-700"
            >Email ou nom d'utilisateur</label
          >
          <input
            type="text"
            id="usernameOrEmail"
            v-model="data.usernameOrEmail"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="ex : lucas.dupont@gmail.com ou lucas_dp"
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="data.password"
            class="w-full placeholder:text-black font-light px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="8 caractères minimum"
          />
        </div>
        <p class="text-red-500 mb-6">{{ errorMessage }}</p>
        <div class="flex justify-center mb-10 lg:justify-center lg:pt-8">
          <Button @click="handleValidation" url="" text="Se connecter" />
        </div>
      </form>
    </div>
  </div>
</template>
