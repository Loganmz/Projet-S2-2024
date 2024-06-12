<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card from '@/components/Card.vue'
import Cardtodolist from '@/components/Cardtodolist.vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import iconRoundcheck from '@/components/icons/iconRoundcheck.vue'
import iconRoundfull from '@/components/icons/iconRoundfull.vue'
import Loading from '@/components/loading.vue'

interface Todolist {
  nom_activite: string;
  description: string;
  image_activite: string;
  id: string;
  collectionId: string;
  collectionName: string;
  duration: string;
  created: string;
  updated: string;
}

interface Activite {
  id: string;
  collectionId: string;
  collectionName: string;
  nom_activite: string;
  recommandation: boolean;
  image_activite: string;
  image_session: string;
  created: string;
  updated: string;
}

const CardListe = ref<Todolist[]>([])
const RecommandationListe = ref<Activite[]>([])
const ActiviteListe = ref<Activite[]>([])
const loading = ref(true)

const router = useRouter()

const fetchData = async () => {
  try {
    CardListe.value = await pb.collection('todolist').getFullList<Todolist>()
    RecommandationListe.value = await pb
      .collection('activite')
      .getFullList<Activite>({ filter: 'recommandation=true' })
    ActiviteListe.value = await pb
      .collection('activite')
      .getFullList<Activite>({ filter: 'recommandation=false' })
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
        <h2 class="text-lg font-semibold">Comment vous sentez-vous aujourd'hui ?</h2>
        <div class="grid pt-6 grid-cols-4">
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
        <h2 class="text-xl pt-9 font-semibold">Recommandation</h2>
        <Suspense>
          <template #default>
            <div class="grid grid-cols-2 gap-6">
              <Card
                v-for="activite in RecommandationListe"
                :key="activite.nom_activite"
                v-bind="activite"
              />
            </div>
          </template>
          <template #fallback>
            <p>Chargement...</p>
          </template>
        </Suspense>

        <h2 class="text-xl font-semibold">Poursuit ta journée</h2>
        <div class="flex space-x-4 p-4 items-center">
          <!-- Timeline Icons -->
          <div class="flex flex-col items-center -z-20 space-y-8 gap-16">
            <div v-for="(step, index) in steps" :key="index" class="relative flex items-center">
              <div class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <component :is="step.icon" class="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          <!-- Cards -->
          <div class="flex flex-col space-y-4">
            <Cardtodolist
              v-for="card in CardListe"
              :key="card.nom_activite"
              v-bind="card"
            />
          </div>
        </div>

        <h2 class="text-xl font-semibold">Tu peux aussi</h2>
        <Suspense>
          <template #default>
            <div class="grid grid-cols-2 gap-6">
              <Card
                v-for="activite in ActiviteListe"
                :key="activite.nom_activite"
                v-bind="activite"
              />
            </div>
          </template>
          <template #fallback>
            <p>Chargement...</p>
          </template>
        </Suspense>
      </section>
    </div>
  </div>
</template>
