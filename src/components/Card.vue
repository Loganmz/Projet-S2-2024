<script setup lang="ts">
import type { ActiviteResponse, RecordIdString } from '@/pocketbase-types';
import { ref } from 'vue'
const props = defineProps<ActiviteResponse<any>>()
import ImgPb from './ImgPb.vue'


</script>

<template>
    <RouterLink :to="'/activite/' + id">
 <section class="text-black">
    
    <div
      class="shadow p-4 rounded-lg"
    >
    <ImgPb :record="props"
     :filename="image_activite"
      class=""
    />
    </div>
    <div class="grid items-center justify-center grid-cols-1">
    <h3 class=" py-5 col-start-1">{{nom_activite}}</h3>
    </div>
 </section>
</RouterLink> 

</template>