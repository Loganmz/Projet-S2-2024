<script>

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090/#/collections?collectionId=m54u9zo33xgvuce');
import { savePhoto } from '../backend.ts';
import { useRouter } from 'vue-router';


export default {
  data() {
    return {
      photo: null,
      lieu: '', // Ajout du champ lieu
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.video.srcObject = stream;
      } catch (err) {
        console.error("Erreur d'accès à la caméra : ", err);
      }
    },
    capturePhoto() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      this.photo = canvas.toDataURL('image/png');

      // Save photo to PocketBase
      this.savePhoto();
    },
    async savePhoto() {
      const dataURL = this.photo;
      const blob = await (await fetch(dataURL)).blob();
      const formData = new FormData();
      formData.append('photo', blob, 'photo.png');
      formData.append('date_de_la_photo', new Date().toISOString());
      formData.append('lieu', this.lieu); // Ajout du lieu

      fetch('http://127.0.0.1:8090/api/collections/Souvenirs_photo/records', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Photo enregistrée avec succès :', data);
        alert('Photo enregistrée avec succès');
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement de la photo :', error);
      });
    },
    goBack() {
      // Logic to go back to the previous page or component
    },
  },
};


</script>

<template>
  <div class="h-screen flex flex-col justify-between items-center bg-black text-white">
    <div class="w-full flex justify-start p-4">
      <button @click="goBack"class="text-2xl">&larr;</button>
    </div>
    <input v-model="lieu" type="text" placeholder="Entrez le lieu" class="mb-4 p-2 rounded text-black">
    <video ref="video" class="flex-grow w-full" autoplay></video>
    <button @click="capturePhoto" class="mb-4 bg-white rounded-full w-16 h-16"></button>
    <canvas ref="canvas" class="hidden"></canvas>
  </div>
</template>


