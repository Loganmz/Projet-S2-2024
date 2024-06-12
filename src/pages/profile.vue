<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 ">
    <div class=" rounded-lg p-6 w-full max-w-sm">
      <div class="flex mb-4">
        
        <div class="relative w-24 h-24 mb-12 text-sm">
          <p class="whitespace-nowrap mb-2">Photo de profil</p>
          <img
            v-if="profileImage"
            :src="profileImage"
            alt="Profil"
            class="w-full h-full rounded-full object-cover"
          />
          <div
            v-else
            class="w-full h-full rounded-full bg-gray-300 flex items-center justify-center"
          >
            <IconCamera />
          </div>
          <input
            type="file"
            @change="onFileChange"
            class="absolute inset-0 opacity-0 cursor-pointer z-20"
          />
        </div>
      </div>
      <form @submit.prevent="enregistrerProfil">
        <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nom"> Nom * </label>
          <input
            v-model="nom"
            id="nom"
            type="text"
            placeholder="Entrez votre nom"
            class=" appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300 mb-4"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom"> Prénom * </label>
          <input
            v-model="prenom"
            id="prenom"
            type="text"
            placeholder="Entrez votre prénom"
            class=" appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center mt-4">
          <Button class="" url="/" text="Enregistrer" />
        </div>
        <div class="flex items-center justify-center mt-4">
        <Button @click="logout" text="Se déconnecter" />
      </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import IconCamera from '@/components/icons/IconCamera.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { pb } from '@/backend'; // Assurez-vous que l'instance PocketBase est importée correctement

const router = useRouter();
const nom = ref<string>('');
const prenom = ref<string>('');
const profileImage = ref<string | null>(null);

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0] && input.files[0].type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        profileImage.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};


const enregistrerProfil = () => {
  console.log('Nom:', nom.value);
  console.log('Prénom:', prenom.value);
  console.log('Profile Image:', profileImage.value);
};

const logout = async () => {
  try {
    pb.authStore.clear(); // Efface le token d'authentification et déconnecte l'utilisateur
    router.push('/Connexion'); // Redirige vers la page de connexion après déconnexion
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

import { useHead } from '@unhead/vue';
useHead({
  title: 'Profile | PuryMind',
  meta: [
    {
      name: 'description',
      content: 'Votre profil PuryMind',
    },
  ],
});
</script>



