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
  photo_de_profil: null as File | null
})

const handleValidation = async () => {
  console.log('Valeurs des champs avant la validation :', data.value)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    data.value.username === '' ||
    data.value.email === '' ||
    data.value.password === '' ||
    data.value.passwordConfirm === '' ||
    data.value.prenom === '' ||
    data.value.nom === ''
  ) {
    errorMessage.value = '⚠ Veuillez remplir tous les champs'
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
      try {
        const formData = new FormData();
        formData.append('username', data.value.username);
        formData.append('email', data.value.email);
        formData.append('password', data.value.password);
        formData.append('prenom', data.value.prenom);
        formData.append('nom', data.value.nom);
        if (data.value.photo_de_profil) {
          formData.append('photo_de_profil', data.value.photo_de_profil);
        }
        await Adduser(formData);
        router.push('../');
        console.log('Utilisateur ajouté avec succès :', data.value);
        errorMessage.value = '';
      } catch (error) {
        errorMessage.value = 'Erreur lors de la création de l\'utilisateur' ;
      }
    }
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    data.value.photo_de_profil = target.files[0];
  }
}

import { useHead } from '@unhead/vue'
useHead({
  title: 'Inscription | PuryMind',
  meta: [
    {
      name: 'description',
      content: ' Page d inscription de PuryMind, venez vous découvrir avec PuryMind !'
    }
  ]
})
</script>

<template>
  <div class="px-5 flex flex-col gap-5">
    <div class="flex flex-col gap-8">
      <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">Créer un compte</h1>
    </div>
    <div class="container mx-auto mt-2">
      <form class="max-w-md mx-auto text-black" @submit.prevent="handleValidation">
        <div class="mb-5">
          <label for="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            v-model="data.prenom"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="ex : Lucas"
          />
        </div>
        <div class="mb-5">
          <label for="nom">Nom</label>
          <input
            type="text"
            id="nom"
            v-model="data.nom"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="ex : Dupont"
          />
        </div>
        <div class="mb-5">
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="data.username"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 rounded-md bg-slate-200/50"
            placeholder="ex : lucas_dp"
          />
        </div>
        <div class="mb-5">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="data.email"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="ex : lucas.dupont@gmail.com"
          />
        </div>
        <div class="mb-5">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="data.password"
            class="w-full placeholder:text-black font-light px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="8 caractères minimum"
          />
        </div>
        <div class="mb-5">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="data.passwordConfirm"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="8 caractères minimum"
          />
        </div>
        <div class="mb-5">
          <label for="photo_de_profil">Photo de profil</label>
          <input
            type="file"
            id="photo_de_profil"
            accept="image/*"
            @change="handleFileChange"
            class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md"
            placeholder="Photo de profil"
          />
        </div>
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="polconfident"
            v-model="polconfident"
            class="mr-2"
          />
          <label for="polconfident" class="text-sm">J'accepte la <a href="#" class="text-blue-500">politique de confidentialité</a></label>
        </div>
        <p class="text-red-500 mb-2">{{ errorMessage }}</p>
        <div class="flex justify-center mb-2 lg:justify-center lg:pt-8">
          <Button @click="handleValidation" url="" text="S'inscrire" />
        </div>
        <div class="flex justify-center mb-4 text-sm">
          <p>Vous nêtes deja inscrit ?</p>
          <RouterLink to="/Connexion" class="text-sky-500">Connectez-vous ici !</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
