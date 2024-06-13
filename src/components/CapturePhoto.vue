<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const pb = new PocketBase('https://app-purymind.noelie-talhouarn.fr'); // Assurez-vous d'utiliser votre propre URL PocketBase
const router = useRouter();
const isRearCamera = ref(true);
const video = ref(null);
const canvas = ref(null);
const lieu = ref('');

const goBack = () => {
  router.go(-1);
};

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: isRearCamera.value ? 'environment' : 'user' },
      audio: false,
    });
    if (video.value) {
      video.value.srcObject = stream;
    }
  } catch (err) {
    console.error("Erreur d'accès à la caméra : ", err);
  }
};

const toggleCamera = () => {
  isRearCamera.value = !isRearCamera.value;
  stopCamera();
  startCamera();
};

const stopCamera = () => {
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
};

const capturePhoto = () => {
  const context = canvas.value.getContext('2d');
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  context.drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight);
  const photo = canvas.value.toDataURL('image/png');

  savePhoto(photo);
};

const savePhoto = async (photo) => {
  try {
    const blob = await (await fetch(photo)).blob();
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');
    formData.append('date_de_la_photo', new Date().toISOString());
    formData.append('lieu', lieu.value);
    formData.append('possede', pb.authStore.model.id); // Ajout de la référence à l'utilisateur actuel

    const record = await pb.collection('Souvenirs_photo').create(formData);
    console.log('Photo enregistrée avec succès :', record);
    alert('Photo enregistrée avec succès');

    // Assurez-vous que fetchPhotos() est appelé ici pour mettre à jour le calendrier
    // fetchPhotos();
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la photo :', error);
    alert('Erreur lors de l\'enregistrement de la photo');
  }
};

onMounted(() => {
  startCamera();
  // Assurez-vous de charger les photos initiales du calendrier
  // fetchPhotos(); // Décommentez si nécessaire
});

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<template>
  <div class="h-screen flex flex-col bg-black text-white relative">
    <div class="flex justify-between p-4">
      <button @click="goBack" class="text-2xl">&larr;</button>
      <button @click="toggleCamera" class="text-2xl">Switch Camera</button>
    </div>
    <input 
      v-model="lieu" 
      type="text" 
      placeholder="Entrez le lieu" 
      class="mb-4 p-2 rounded text-black mx-4"
    >
    <div class="flex-grow flex items-center justify-center">
      <video 
        ref="video" 
        class="w-full h-full object-cover" 
        autoplay 
        playsinline
        style="transform: scaleX(-1);"
      ></video>
    </div>
    <div class="absolute bottom-32 left-1/2 transform -translate-x-1/2">
      <button 
        @click="capturePhoto" 
        class="bg-white rounded-full w-16 h-16 flex items-center justify-center text-black"
        style="font-size: 1.5rem;"
      >
        <span class="sr-only">Capture</span>
      </button>
    </div>
    <canvas ref="canvas" class="hidden"></canvas>
  </div>
</template>
