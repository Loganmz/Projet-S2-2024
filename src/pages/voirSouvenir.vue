<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <span class="text-xl font-bold">{{ currentYear }}</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        class="border p-2"
        v-for="month in visibleMonths"
        :key="month"
        :ref="month === currentMonth ? 'currentMonth' : null"
      >
        <div class="font-bold text-center mb-2">{{ getMonthName(month) }}</div>
        <div class="grid grid-cols-7 gap-1">
          <div class="border p-1" v-for="day in getDaysInMonth(month)" :key="day.date">
            <div class="text-right">{{ day.date }}</div>
            <div>
              <img
                v-for="photo in day.photos"
                :key="photo.id"
                :src="photo.url"
                class="w-full h-auto cursor-pointer"
                alt="photo"
                @click="showPhoto(photo.url)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="fixed inset-0 z-10 flex items-center justify-center" v-if="showModal">
      <div class="absolute inset-0 bg-black opacity-75"></div>
      <div class="z-20 bg-white p-4 max-w-full max-h-full overflow-auto">
        <img :src="selectedPhotoUrl" class="max-w-full max-h-full" alt="photo" />
        <div class="text-center mt-2">
          {{ getPhotoDate(selectedPhotoUrl) }}
        </div>
        <button @click="closeModal" class="absolute top-0 right-0 m-4 text-white">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const photos = ref([]);
let currentYear = ref(2024);
let currentMonth = ref<number | null>(new Date().getMonth() + 1); // Initialisez currentMonth directement ici
let showModal = ref(false);
let selectedPhotoUrl = ref('');
const currentMonthRef = ref<HTMLDivElement | null>(null); // Créer une référence pour le mois en cours

const visibleMonths = computed(() => {
  const currentYearValue = new Date().getFullYear();
  const currentMonthValue = new Date().getMonth() + 1; // Les mois sont indexés à partir de 0
  const months = [];
  for (let month = 1; month <= currentMonthValue; month++) {
    months.push(month);
  }
  return months;
});

onMounted(() => {
  currentYear.value = new Date().getFullYear();
  fetchPhotos();
});

async function fetchPhotos() {
  try {
    const records = await pb.collection('Souvenirs_photo').getFullList();
    photos.value = records.map(record => ({
      id: record.id,
      date: new Date(record.date_de_la_photo),
      url: pb.files.getUrl(record, record.photo),
    }));
    nextTick(() => {
      scrollToCurrentMonth(); // Appel de scrollToCurrentMonth après avoir récupéré les photos
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des photos :', err);
  }
}

function getMonthName(month: number) {
  return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
}

function getDaysInMonth(month: number) {
  const year = currentYear.value;
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      photos: photos.value.filter(photo => {
        const photoDate = photo.date;
        return photoDate.getFullYear() === year && photoDate.getMonth() === month - 1 && photoDate.getDate() === i;
      }),
    });
  }
  return days;
}

function showPhoto(url: string) {
  selectedPhotoUrl.value = url;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedPhotoUrl.value = '';
}

function getPhotoDate(url: string) {
  const photo = photos.value.find(photo => photo.url === url);
  if (photo) {
    return photo.date.toLocaleDateString(); // Formate la date en une chaîne de caractères
  }
  return '';
}

function scrollToCurrentMonth() {
  const currentMonthElement = currentMonthRef.value; // Accéder à la référence créée
  if (currentMonthElement) {
    currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>





