<template>
  <div class="welcome flex flex-col items-center justify-center">
    
    <!-- <img src="@/assets/logo.png" alt="PuryMind Logo" class="max-w-100px mb-6" /> -->
    <h1 class="text-2xl font-bold mb-4">Welcome to PuryMind</h1>
    <p class="text-lg mb-4">Providing the best tool to help you find your serenity and remind you of the good moments.</p>
        <Button url="/Inscription" text="Commencer" />

    
    <p class="text-sm">You already have an account? <router-link to="/Connexion" class="text-blue-500">se connecter</router-link></p>
  </div>
  
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

