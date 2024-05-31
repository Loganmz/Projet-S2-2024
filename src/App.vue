<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import FooterPage from './components/FooterPage.vue'
import HeaderPage from './components/HeaderPage.vue'


onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '/ninfo : ', info, '/ncomposant : ', instance)
  return true
})
</script>

<template>
  <HeaderPage />
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
  <FooterPage />
</template>
