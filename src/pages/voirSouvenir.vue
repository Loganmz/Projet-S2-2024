<template>
  <div class=" flex flex-col bg-white text-black">
    <div class="flex justify-start p-4">
      <button @click="goBack" class="text-2xl">&larr;</button>
    </div>
    <div >
      <Calendar />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Calendar from '../components/Calendar.vue';  // Assurez-vous que le chemin est correct

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
  components: {
    Calendar,
  },
};
</script>

