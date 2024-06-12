<!-- Loading.vue -->
<script setup lang="ts">
import IconLogoloading from './icons/IconLogoloading.vue';
</script>
<template>
    
  <div class="fixed inset-0 flex py-6 flex-col items-center justify-center gradient-bg z-50">
    <img class=" img-overlay top-0 w-2/3" src="/public/img/Saly-32.webp" alt="">
    <IconLogoloading class="w-96"/>

    <div class="flex flex-col justify-center gap-6 align-center">
        
        <h1 class="text-3xl text-white grid text-center font-semibold">
            
            <span>Welcome to </span>
            <span>PuryMind</span>
        </h1>
        <p class="text-center text-white text-sm font-extralight container">Providing the best tool to help you find your serenity and remind you of the good moment</p>
    </div>
    <img class="w-1/3 pt-10 img-overlay" src="/public/img/Saly-2.webp" alt="">
  </div>
  
  
</template>



