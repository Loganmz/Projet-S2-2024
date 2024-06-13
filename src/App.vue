<script setup lang="ts">
import { onErrorCaptured, onMounted, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router/auto'
import FooterPage from './components/FooterPage.vue'
import HeaderPage from './components/HeaderPage.vue'
import { pb } from '@/backend'

// Gestion des erreurs globales
onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '/ninfo : ', info, '/ncomposant : ', instance)
  return true
})

const router = useRouter()
const route = useRoute()

// Redirection basée sur l'authentification
onMounted(() => {
  const isAuthenticated = pb.authStore.isValid

  if (!isAuthenticated && route.path !== '/welcome') {
    router.replace('/welcome')
  }
})

// Liste des chemins où le Header et le Footer ne doivent pas apparaître
const excludedPaths = ['/Inscription', '/Connexion', '/confirm-password-reset', '/ResetPasswordRequest', '/AvantConnexion', '/welcome']

// Calculer si le chemin actuel doit inclure le Header et le Footer
const showHeaderFooter = computed(() => !excludedPaths.includes(route.path))
</script>

<template>
  <HeaderPage v-if="showHeaderFooter" />
  <main>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </RouterView>
  </main>
  <FooterPage v-if="showHeaderFooter" />
</template>
