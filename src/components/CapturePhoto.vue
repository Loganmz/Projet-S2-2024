<template>
  <div class="h-screen flex flex-col bg-black text-white">
    <div class="flex justify-start p-4">
      <button @click="goBack" class="text-2xl">&larr;</button>
    </div>
    <input v-model="lieu" type="text" placeholder="Entrez le lieu" class="mb-4 p-2 rounded text-black mx-4">
    <div class="flex-grow flex items-center justify-center">
      <video ref="video" class="w-full h-full object-cover" autoplay></video>
    </div>
    <div class="flex justify-center mb-4">
      <button @click="capturePhoto" class="bg-white rounded-full w-12 h-12"></button>
    </div>
    <canvas ref="canvas" class="hidden"></canvas>
  </div>
</template>

<script>
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';


const pb = new PocketBase('http://127.0.0.1:8090/#/collections?collectionId=m54u9zo33xgvuce');

export default {
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack,
    };
  },
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
  const lastPhotoDate = localStorage.getItem('lastPhotoDate');
  console.log('Last photo date:', lastPhotoDate); // Débogage

  const today = new Date().toISOString().split('T')[0];
  console.log('Today:', today); // Débogage

  if (lastPhotoDate === today) {
    alert('Vous avez déjà pris une photo aujourd\'hui.');
    return;
    
  }
  

  const video = this.$refs.video;
  const canvas = this.$refs.canvas;
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  this.photo = canvas.toDataURL('image/png');

  // Save photo to PocketBase
  this.savePhoto();

  // Mettre à jour la date de la dernière photo dans le stockage local
  localStorage.setItem('lastPhotoDate', today);
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
  },
};
</script>



