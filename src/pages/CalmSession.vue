<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  
  const isInspiring = ref(true);
  const message = ref('Inspirez');
  
  const breathingClass = computed(() => isInspiring.value ? 'scale-100 transition-transform duration-[4000ms] ease-in-out' : 'scale-50 transition-transform duration-[4000ms] ease-in-out');
  
  onMounted(() => {
    setInterval(() => {
      isInspiring.value = !isInspiring.value;
      message.value = isInspiring.value ? 'Inspirez' : 'Respirez';
    }, 4000);
  });
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-black">
    <div class="text-center">
        <p class="text-white" >4 sec</p>
      <div class="relative h-64 w-64 rounded-full bg-sky-700">
        <!-- Utilisation des transitions CSS -->
        <div :class="[breathingClass]" class="absolute top-0 left-0 h-full w-full rounded-full bg-sky-500"></div>
      </div>
      <p class="mt-4 text-xl font-semibold text-white">{{ message }}</p>
    </div>
  </div>
</template>
