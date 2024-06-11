<template>
  <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
    <div>
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="text-sm text-gray-500">
        {{ description }}
        <span v-if="duration" class="font-semibold"> - {{ duration }}</span>
      </p>
    </div>
    <div class="ml-4">
      <img :src="imageSrc" alt="Icon" class="w-16 h-16 rounded-full object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  title: string,
  description: string,
  imageSrc: string,
  duration?: string
}>();
</script>