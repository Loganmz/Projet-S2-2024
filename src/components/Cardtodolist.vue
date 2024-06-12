
<script setup lang="ts">
import type { TodolistResponse } from '@/pocketbase-types';
import { defineProps } from 'vue';
import ImgPb from './ImgPb.vue';

const props = defineProps<TodolistResponse<any>>();
const { id, nom_activite, description, image_activite, duration } = props;

interface Todolist {
  nom_activite: string;
  description: string;
  image_activite: string;
  id: string;
  collectionId: string;
  collectionName: string;
  duration: string;
  created: string;
  updated: string;
}

</script>


<template>
  <RouterLink :to="'/activite/' + id">
    <section class="text-black text-sm">
      <div class="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4">
        
        <div class="grid items-center justify-center grid-cols-1">
        <h3 class="py-5 col-start-1">{{ nom_activite }}</h3>
        <p class="text-xs text-gray-500 col-start-1">
          {{ description }}
          <span v-if="duration" class="font-semibold"> - {{ duration }}</span>
        </p>
      </div>
      <ImgPb :record="props" :filename="image_activite" class="w-16 h-16 object-cover rounded-full" />
      </div>
      
    </section>
  </RouterLink>
</template>
