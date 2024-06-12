<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <span class="text-xl font-bold">{{ currentYear }}</span>
      <div class="relative">
        <button @click="toggleFilterDropdown" class="flex items-center transition-colors duration-300">
          FILTRER 
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013 6V4z"></path>
          </svg>
        </button>
        <div v-if="showFilterDropdown" class="absolute right-0 mt-2 bg-white shadow-md rounded border z-10">
          <button
            v-for="month in availableMonths"
            :key="month"
            @click="filterByMonth(month)"
            class="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
          >
            {{ getMonthName(month) }}
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        class="border p-2"
        v-for="(month, index) in visibleMonths"
        :key="month"
        :ref="month === currentMonth ? 'currentMonth' : 'month' + index"
      >
        <div class="font-bold text-center mb-2">{{ getMonthName(month.month) }}</div>
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
    <!-- Modal -->
<div class="fixed inset-0 z-10 flex items-center justify-center" v-if="showModal">
  <div class="absolute inset-0 bg-black opacity-75"></div>
  <div class="z-20 bg-white p-4 max-w-full max-h-full overflow-auto">
    <img :src="selectedPhotoUrl" class="max-w-full max-h-full" alt="photo" />
    <div class="text-center mt-2">
      {{ getPhotoDate(selectedPhotoUrl) }}
    </div>
    <button @click="closeModal" class="absolute top-0 right-0 m-4 text-white">&times;</button>
    <!-- Bouton Supprimer -->
    <div class="text-center mt-2">
      <button @click="deleteSelectedPhoto" class="text-red-500">Supprimer</button>
    </div>
  </div>
</div>
  </div>

</template>



<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const photos = ref([]);
let currentYear = ref(new Date().getFullYear());
let currentMonth = ref<number | null>(new Date().getMonth() + 1);
let showModal = ref(false);
let selectedPhotoUrl = ref('');
let showFilterDropdown = ref(false);
const currentMonthRef = ref<HTMLDivElement | null>(null);

const visibleMonths = computed(() => {
  const months = [];
  const currentYearValue = new Date().getFullYear();
  const lastYearValue = currentYearValue - 1;

  // Add all months from last year
  for (let month = 1; month <= 12; month++) {
    months.push({ year: lastYearValue, month });
  }

  // Add months from this year up to the current month
  for (let month = 1; month <= new Date().getMonth() + 1; month++) {
    months.push({ year: currentYearValue, month });
  }

  if (currentMonth.value !== null) {
    // Filter to only show the selected month
    return months.filter(m => m.year === currentYear.value && m.month === currentMonth.value);
  }

  return months;
});

const availableMonths = computed(() => {
  const months = [];
  const currentMonthValue = new Date().getMonth() + 1;

  // Add months from this year up to the current month
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
      scrollToCurrentMonth();
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des photos :', err);
  }
}

function getMonthName(month: number) {
  return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
}

function getDaysInMonth({ year, month }) {
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
    return photo.date.toLocaleDateString();
  }
  return '';
}

function setCurrentMonth(month: number) {
  currentMonth.value = month;
  nextTick(() => {
    scrollToCurrentMonth();
  });
}

function filterByMonth(month: number) {
  setCurrentMonth(month);
  showFilterDropdown.value = false;
}

function toggleFilterDropdown() {
  showFilterDropdown.value = !showFilterDropdown.value;
}
async function deleteSelectedPhoto() {
  if (selectedPhotoUrl.value) {
    const photoToDelete = photos.value.find(photo => photo.url === selectedPhotoUrl.value);
    if (photoToDelete) {
      await deletePhoto(photoToDelete.id);
      closeModal();
    }
  }
}

async function deletePhoto(photoId) {
  try {
    // Supprimer la photo de l'interface utilisateur
    photos.value = photos.value.filter(photo => photo.id !== photoId);

    // Supprimer la photo de la base de données
    await pb.collection('Souvenirs_photo').delete(photoId);
  } catch (err) {
    console.error('Erreur lors de la suppression de la photo :', err);
  }
}

function scrollToCurrentMonth() {
  const currentMonthElement = currentMonthRef.value;
  if (currentMonthElement) {
    currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>


