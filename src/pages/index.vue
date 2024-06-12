<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Card from '@/components/Card.vue'
import Cardtodolist from '@/components/Cardtodolist.vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import iconRoundcheck from '@/components/icons/iconRoundcheck.vue'
import iconRoundfull from '@/components/icons/iconRoundfull.vue'
import Loading from '@/components/loading.vue'
import { formatDate } from '@/helper';
import suivi from '@/components/suivi.vue'

interface todolist {
  nom_activite: string;
  description: string;
  image_activite: string;
  id: string;
  collectionId: string;
  collectionName: Collections;
  duration: string;
  created: string;
  updated: string;
  link?: string;
}

interface activite {
  id: string;
  collectionId: string;
  collectionName: Collections;
  nom_activite: string;
  recommandation: boolean;
  image_activite: string;
  image_session: string;
  created: string;
  updated: string;
  link?: string;
  description: string;
}



const CardListe = ref<todolist[]>([])
const RecommandationListe = ref<activite[]>([])
const ActiviteListe = ref<activite[]>([])
const loading = ref(true)

const router = useRouter()
const currentDate = ref('');

const fetchCurrentDate = async () => {
  try {
    const date = new Date().toISOString().slice(0, 10);
    currentDate.value = date;
  } catch (error) {
    console.error('Erreur lors de la récupération de la date du jour :', error);
  }
};

onMounted(fetchCurrentDate);
const fetchData = async () => {
  try {
    const todolistData = await pb.collection('todolist').getFullList<todolist>();
    const activiteData = await pb.collection('activite').getFullList<activite>();

    CardListe.value = todolistData.map(item => ({
      ...item,
      link: `/todolist/${item.id}` // Exemple de lien pour chaque item todolist
    }));

    RecommandationListe.value = activiteData
      .filter(item => item.recommandation)
      .map(item => ({
        ...item,
        link: `/activite/${item.id}` // Exemple de lien pour chaque item recommandé
      }));

    ActiviteListe.value = activiteData
      .filter(item => !item.recommandation)
      .map(item => ({
        ...item,
        link: `/activite/${item.id}` // Exemple de lien pour chaque item non recommandé
      }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};


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
import type { Collections } from '@/pocketbase-types'
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
      <section class="container pt-8">
        <h3>{{ formatDate(currentDate) }}</h3>
        <h2 class="text-lg font-semibold">Comment vous sentez-vous aujourd'hui ?</h2>
        <suivi />
      </section>

      <section class="container grid grid-cols-1 gap-9">
        <h2 class="text-xl pt-9 font-semibold">Recommandation</h2>
        <Suspense>
          <template #default>
            <div class="grid grid-cols-2 gap-6">
              <RouterLink v-for="activite in RecommandationListe" :key="activite.id" :to="activite.link ?? '/'">
                <Card v-bind="activite" />
              </RouterLink>
            </div>
          </template>
          <template #fallback>
            <p>Chargement...</p>
          </template>
        </Suspense>

        <h2 class="text-xl font-semibold">Poursuit ta journée</h2>
        <div class="flex space-x-4 p-4 items-center">
          <div class="flex flex-col items-center -z-20 space-y-8 gap-16">
            <div v-for="(step, index) in steps" :key="index" class="relative flex items-center">
              <div class="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center">
                <component :is="step.icon" class="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          <div class="flex flex-col space-y-4">
            <RouterLink v-for="card in CardListe" :key="card.id" :to="card.link ?? '/'">
              <Cardtodolist v-bind="card" />
            </RouterLink>
          </div>
        </div>

        <h2 class="text-xl font-semibold">Tu peux aussi</h2>
        <Suspense>
          <template #default>
            <div class="grid grid-cols-2 gap-6">
              <RouterLink v-for="activite in ActiviteListe" :key="activite.id" :to="activite.link ?? '/'">
                <Card v-bind="activite" />
              </RouterLink>
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

