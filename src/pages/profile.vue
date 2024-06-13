<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100">
    <div class="rounded-lg p-6 w-full max-w-sm">
      <div class="flex mb-4">
        <div class="relative w-24 h-24 mb-12 text-sm">
          <p class="whitespace-nowrap mb-2">Photo de profil</p>
          <img
            v-if="photo_de_profil"
            :src="photo_de_profil"
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
            class="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300 mb-4"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom"> Prénom * </label>
          <input
            v-model="prenom"
            id="prenom"
            type="text"
            placeholder="Entrez votre prénom"
            class="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          />
        </div>
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center mt-4">
            <Button @click="enregistrerProfil" class="" url="/" text="Enregistrer" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { pb } from '@/backend';
import { updateProfile } from '@/backend'; // Assurez-vous que cette fonction est correctement importée
import Button from '@/components/Button.vue';
import IconCamera from '@/components/icons/IconCamera.vue';

const router = useRouter();
const nom = ref<string>('');
const prenom = ref<string>('');
const photo_de_profil = ref<string | undefined>(undefined);

const fetchUserProfile = () => {
  const user = pb.authStore.model;
  if (user) {
    nom.value = user.nom || '';
    prenom.value = user.prenom || '';
    photo_de_profil.value = user.photo_de_profil || null;
  }
};

onMounted(() => {
  fetchUserProfile();
  enregistrerProfil();

});

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0] && input.files[0].type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        photo_de_profil.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const enregistrerProfil = async () => {
  try {
    const userId = pb.authStore.model.id;
    await updateProfile(userId, {
      nom: nom.value,
      prenom: prenom.value,
      photo_de_profil: photo_de_profil.value,
    });
    console.log('Profil mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
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
