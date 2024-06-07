<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <span class="text-xl font-bold">{{ currentYear }}</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="border p-2" v-for="month in visibleMonths" :key="month">
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

<script>
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default {
  data() {
    return {
      photos: [],
      currentYear: 2024,
      currentMonth: null,
      showModal: false,
      selectedPhotoUrl: '',
    };
  },
  computed: {
    visibleMonths() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const months = [];
      for (let month = 1; month <= currentMonth; month++) {
        months.push(month);
      }
      return months;
    },
  },
  mounted() {
    this.currentMonth = new Date().getMonth() + 1;
    this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      try {
        const records = await pb.collection('Souvenirs_photo').getFullList();
        this.photos = records.map(record => ({
          id: record.id,
          date: new Date(record.date_de_la_photo),
          url: pb.files.getUrl(record, record.photo),
        }));
      } catch (err) {
        console.error('Erreur lors de la récupération des photos :', err);
      }
    },
    getMonthName(month) {
      return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
    },
    getDaysInMonth(month) {
      const year = this.currentYear;
      const daysInMonth = new Date(year, month, 0).getDate();
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: i,
          photos: this.photos.filter(photo => {
            const photoDate = photo.date;
            return photoDate.getFullYear() === year && photoDate.getMonth() === month - 1 && photoDate.getDate() === i;
          }),
        });
      }
      return days;
    },
    showPhoto(url) {
      this.selectedPhotoUrl = url;
      this.showModal = true;
      
    },
    closeModal() {
      this.showModal = false;
      this.selectedPhotoUrl = '';
    },
    getPhotoDate(url) {
  const photo = this.photos.find(photo => photo.url === url);
  if (photo) {
    return photo.date.toLocaleDateString(); // Formate la date en une chaîne de caractères
  }
  return '';
},


  },
};

</script>
