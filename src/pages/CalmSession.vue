<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import Button from '@/components/Button.vue';
  
  const isInspiring = ref(true);
  const message = ref('Inspirez');
  
  const breathingClass = computed(() => isInspiring.value ? 'scale-100 transition-transform duration-[4000ms] ease-in-out' : 'scale-50 transition-transform duration-[4000ms] ease-in-out');
  
  onMounted(() => {
    setInterval(() => {
      isInspiring.value = !isInspiring.value;
      message.value = isInspiring.value ? 'Inspirez' : 'Respirez';
    }, 4000);

    
  });

  import { useHead } from '@unhead/vue'
useHead({
  title: 'Session Calme | PuryMind',
    meta: [
        {
        name: 'description',
        content: 'Session de respiration pour vous aider à vous détendre et à vous recentrer sur vous-même.'
        }
    ]
})

  
</script>

<template>
  <div class="flex justify-center  bg-black py-16">
    <div class="text-center">
        <p class="text-white py-8" >4 sec</p>
      <div class="relative h-64 w-64 rounded-full bg-sky-700">
        <!-- Utilisation des transitions CSS -->
        <div :class="[breathingClass]" class="absolute top-0 left-0 h-full w-full rounded-full bg-sky-500"></div>
      </div>
      <p class="mt-4 text-2xl font-semibold text-white  ">{{ message }}</p>
      <Button url="/" text="Revenez sur vos pas" class="my-16"/>
    </div>
    
  </div>
</template>
