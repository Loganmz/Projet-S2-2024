<script setup lang="ts">
import Card from '@/components/Card.vue'
import { pb } from '@/backend'
import { onMounted,ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import iconRoundcheck from '@/components/icons/iconRoundcheck.vue'
import iconRoundfull from '@/components/icons/iconRoundfull.vue'
const RecommandationListe = await pb
  .collection('activite')
  .getFullList({ filter: 'recommandation=true' })
const ActiviteListe = await pb
  .collection('activite')
  .getFullList({ filter: 'recommandation=false' })

const router = useRouter()

// onMounted(() => {
//     if (!pb.authStore.model) {
//         router.replace('/welcome')
//     }
// })

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

const cardstodolist = ref([
  {
    title: 'How do you feel today ?',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna.',
    imageSrc: EmojiIcon,
    duration: ''
  },
  {
    title: 'Quick calm session',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna.',
    imageSrc: CalmSessionIcon,
    duration: '5 min'
  },
  {
    title: 'Learn the quote of the day',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna.',
    imageSrc: QuoteIcon,
    duration: ''
  }
]);
</script>

<template>
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
    <div class="grid grid-cols-2 gap-6">
      <div>
        <div class="flex flex-col items-center">
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
              <component :is="step.icon" class="w-6 h-6 text-white" />
            </div>
            <div v-if="index < steps.length - 1" class="w-px h-10 bg-blue-200"></div>
          </div>
        </div>
      </div>

      <div>

        <div class="flex flex-col items-center space-y-4 p-4">
    <Cardtodolist 
      v-for="(Cardtodolist, index) in cardstodolist" 
      :key="index" 
      :title="Cardtodolist.title" 
      :description="Cardtodolist.description" 
      :imageSrc="Cardtodolist.imageSrc" 
      :duration="Cardtodolist.duration" 
    />
  </div>
      </div>
    </div>
    <h2 class="text-xl font-semibold">Tu peux aussi</h2>
    <div class="grid grid-cols-2 gap-6">
      <Card v-for="activite in ActiviteListe" :key="activite.nom_activite" v-bind="activite" />
    </div>
  </section>
</template>
