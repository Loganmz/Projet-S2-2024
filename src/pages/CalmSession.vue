<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface Meditation {
  id: number;
  title: string;
  description: string;
  audio_url: string;
}

const meditations = ref<Meditation[]>([]);

const fetchMeditations = async () => {
  try {
    const response = await axios.get('https://api.calm.com/meditations');
    meditations.value = response.data; // Assuming the API returns an array of meditations
  } catch (error) {
    console.error('Error fetching meditations:', error);
  }
};

onMounted(fetchMeditations);
</script>

<template>
    <div>
      <h1>Guided Meditations</h1>
      <ul>
        <li v-for="meditation in meditations" :key="meditation.id">
          <h2>{{ meditation.title }}</h2>
          <p>{{ meditation.description }}</p>
          <audio controls :src="meditation.audio_url"></audio>
        </li>
      </ul>
    </div>
  </template>