<script setup lang="ts">
import { ref } from 'vue'
import { Adduser } from '../backend'
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'

const router = useRouter()

const polconfident = ref(false)
const errorMessage = ref('')

const data = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  prenom: '',
  nom: '',
  photo_de_profil: '' // Ajouter le champ photo_de_profil
})

const handleValidation = async () => {
  console.log('Valeurs des champs avant la validation :', data.value)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regular expression for email validation

  if (
    data.value.username === '' ||
    data.value.email === '' ||
    data.value.password === '' ||
    data.value.passwordConfirm === '' ||
    data.value.prenom === '' ||
    data.value.nom === ''
  ) {
    errorMessage.value = '⚠ Veuillez remplir tous les champs' // Mettre à jour le message d'erreur
  } else {
    if (polconfident.value === false) {
      errorMessage.value = '⚠ Veuillez accepter la politique de confidentialité'
    } else if (data.value.password !== data.value.passwordConfirm) {
      errorMessage.value = '⚠ Les mots de passe ne correspondent pas'
    } else if (data.value.password.length < 8) {
      errorMessage.value = '⚠ Le mot de passe doit contenir au moins 8 caractères !'
    } else if (!emailPattern.test(data.value.email)) {
      errorMessage.value = '⚠ Veuillez entrer une adresse email valide'
    } else {
      Adduser(data.value)
      router.push('../')
      console.log('Utilisateur ajouté avec succès :', data.value)
      errorMessage.value = ''
    }
  }
}

console.log('coucou' + data.value)

const handleFileChange = (event) => {
  data.value.photo_de_profil = event.target.files[0]
}
</script>

<template>
  <div class="px-5 flex flex-col gap-5">
    <div class="flex flex-col gap-8">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">Créer un compte</h1>
    </div>
    <div class="container mx-auto mt-2">
      <form class="max-w-md mx-auto text-black">
        <div class="mb-5">
          <input
            type="text"
            id="prenom"
            v-model="data.prenom"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="Prénom"
          />
        </div>
        <div class="mb-5">
          <input
            type="text"
            id="nom"
            v-model="data.nom"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="Nom"
          />
        </div>
        <div class="mb-5">
          <input
            type="text"
            id="username"
            v-model="data.username"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div class="mb-5">
          <input
            type="email"
            id="email"
            v-model="data.email"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="Email"
          />
        </div>
        <div class="mb-5">
          <input
            type="password"
            id="password"
            v-model="data.password"
            class="w-full placeholder:text-black font-light px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="Mot de passe (8 caractères minimum)"
          />
        </div>
        <div class="mb-5">
          <input
            type="password"
            id="confirmPassword"
            v-model="data.passwordConfirm"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="Confirmer le mot de passe"
          />
        </div>
        <div class="mb-5">
          <input
            type="file"
            id="photo_de_profil"
            accept="image/*"
            @change="handleFileChange"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="Photo de profil"
          />
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="polconfident" v-model="polconfident" class="mr-2" />
          <label for="polconfident" class="text-sm"
            >J'approuve
            <RouterLink to="/PolitiqueConfidentialite" class="text-blue-500"
              >la politique de confidentialité</RouterLink
            ></label
          >
        </div>
        <p class="text-red-500 mb-6">{{ errorMessage }}</p>
        <div class="flex justify-center mb-6 lg:justify-center lg:pt-8">
          <Button @click="handleValidation" url="" text="Créer un compte" />
        </div>
      </form>
    </div>
  </div>
</template>
