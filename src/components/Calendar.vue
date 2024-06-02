<template>
  <div class="p-4">
    <h1 class="text-center text-2xl mb-4">Memory</h1>
    <div class="grid grid-cols-7 gap-4">
      <div v-for="day in calendarDays" :key="day.date" class="flex flex-col items-center relative">
        <div>{{ day.label }}</div>
        <div>{{ getMonthName(day.date) }}</div>
        <div 
          v-for="photo in day.photos" 
          :key="photo.id" 
          class="w-16 h-16 bg-cover bg-center mb-2 absolute inset-0" 
          :style="{ backgroundImage: `url(${photo.url})` }"
          @click="openLightbox(photo)">
        </div>
      </div>
    </div>
    <div v-if="lightboxPhoto" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-4">
        <img :src="lightboxPhoto.url" alt="">
        <button @click="lightboxPhoto = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

export default {
  data() {
    return {
      calendarDays: [],
      photos: [], // Ajout des photos dans le data
      lightboxPhoto: null,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // Ajoutez cette ligne
    }
  },
  async mounted() {
    await this.loadPhotos()
    this.generateCalendar()
  },
  methods: {
    async loadPhotos() {
      try {
        const records = await pb.collection('Souvenirs_photo').getFullList()
        const photos = records.map((record) => ({
          id: record.id,
          date: new Date(record.date_de_la_photo),
          url: pb.getFileUrl(record, record.photo)
        }))

        this.photos = photos
      } catch (err) {
        console.error('Erreur lors du chargement des photos : ', err)
      }
    },
    openLightbox(photo) {
      this.lightboxPhoto = photo;
    },
    getMonthName(dateString) {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    return this.months[monthIndex];
  },

    generateCalendar() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay()

      this.calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(this.currentYear, this.currentMonth, i + 1)
        return {
          date,
          label: date.getDate(),
          photos: this.photos.filter(
            (photo) =>
              photo.date.getDate() === date.getDate() &&
              photo.date.getMonth() === date.getMonth() &&
              photo.date.getFullYear() === date.getFullYear()
          )
        }
      })

      // Remplir la première semaine du calendrier avec des jours vides si nécessaire
      for (let i = 0; i < firstDayOfMonth; i++) {
        this.calendarDays.unshift({
          date: null,
          label: '',
          photos: []
        })
      }
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    currentMonth() {
      return new Date().getMonth()
    }
  }
}
</script>
