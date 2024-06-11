<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card from '@/components/Card.vue'
import Cardtodolist from '@/components/Cardtodolist.vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import iconRoundcheck from '@/components/icons/iconRoundcheck.vue'
import iconRoundfull from '@/components/icons/iconRoundfull.vue'
import Loading from '@/components/loading.vue'

const CardListe = ref([])
const RecommandationListe = ref([])
const ActiviteListe = ref([])
const loading = ref(true)

const router = useRouter()

const fetchData = async () => {
  try {
    CardListe.value = await pb.collection('todolist').getFullList()
    RecommandationListe.value = await pb.collection('activite').getFullList({ filter: 'recommandation=true' })
    ActiviteListe.value = await pb.collection('activite').getFullList({ filter: 'recommandation=false' })
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    // Do not stop loading here to test click or scroll event
    // loading.value = false 
  }
}

onMounted(() => {
  fetchData()

  const stopLoading = () => {
    loading.value = false
  }

  window.addEventListener('click', stopLoading)
  window.addEventListener('scroll', stopLoading)

  onBeforeUnmount(() => {
    window.removeEventListener('click', stopLoading)
    window.removeEventListener('scroll', stopLoading)
  })
})

import { useHead } from '@unhead/vue'
useHead({
  title: 'Accueil | PuryMind',
  meta: [
    {
      name: 'description',
      content: 'Accueil de PuryMind, application de gestion de la santé mentale.'
    }
  ]
})

const steps = [{ icon: iconRoundcheck }, { icon: iconRoundcheck }, { icon: iconRoundfull }]
</script>

<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <section class="container">
        <h3>13 fev</h3>
        <h2>Comment vous sentez-vous aujourd'hui ?</h2>
        <div class="grid grid-cols-4">
          <div>
            <RouterLink to="#">
              <img src="/public/img/good.jpg" alt="emoji Good" />
              <p>Très bien</p>
            </RouterLink>
          </div>
          <div>
            <RouterLink to="#">
              <img src="/public/img/imok.jpg" alt="emoji im ok" />
              <p>Bien</p>
            </RouterLink>
          </div>
          <div>
            <RouterLink to="#">
              <img src="/public/img/better.jpg" alt="could be better" />
              <p>Cela pourrait aller mieux</p>
            </RouterLink>
          </div>
          <div>
            <RouterLink to="#">
              <img src="/public/img/notgood.jpg" alt="emoji not good" />
              <p>Pas bien</p>
            </RouterLink>
          </div>
        </div>
      </section>

      <section class="container grid grid-cols-1 gap-9">
        <h2 class="text-xl font-semibold">Recommandation</h2>
        <div class="grid grid-cols-2 gap-6">
          <Card
            v-for="activite in RecommandationListe"
            :key="activite.nom_activite"
            v-bind="activite"
          />
        </div>

        <h2 class="text-xl font-semibold">Poursuit ta journée</h2>
        <div class="flex space-x-4 p-4 items-start">
      <!-- Timeline Icons -->
      <div class="flex flex-col items-center -z-20 space-y-8">
        <div v-for="(step, index) in steps" :key="index" class="relative flex items-center">
          <div class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
            <component :is="step.icon" class="w-16 h-16 text-white" />
          </div>
          <div v-if="index < steps.length - 1" class="h-36 bg-blue-200 "></div>
        </div>
      </div>

      <!-- Cards -->
      <div class="flex flex-col space-y-4">
        <Cardtodolist v-for="Cardtodolist in CardListe" :key="Cardtodolist.nom_activite" v-bind="Cardtodolist" />
      </div>
    </div>

        <h2 class="text-xl font-semibold">Tu peux aussi</h2>
        <div class="grid grid-cols-2 gap-6">
          <Card v-for="activite in ActiviteListe" :key="activite.nom_activite" v-bind="activite" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
