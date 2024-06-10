<script setup lang="ts">
import avatarLogan from '@/components/icons/SVG/avatar-logan.vue';
import avatar_chloe from '@/components/icons/avatar_chloe.vue';
import avatar_noelie from '@/components/icons/avatar_noelie.vue';


import { useHead } from '@unhead/vue'
useHead({
  title: 'A propos | PuryMind',
    meta: [
        {
        name: 'description',
        content: 'Découvrez l\'équipe de PuryMind, qui sommes nous ?'
        }
    ]
})
</script>
<template>
  <div class="text-center">
    <h1 class="text-sky-400 mb-3 mt-10 lg:mt-14">L'Équipe</h1>
    <h2 class="text-black m-3 mb-7">Qui sommes nous ?</h2>
  </div>
  <div class="text-center mr-12 ml-12 lg:grid lg:grid-cols-3 lg:mb-20 mb-20">
    <div
      class="flex flex-col items-center mx-5 lg:mx-10 rounded shadow-2xl  h-full p-9"
    >
    <avatar-logan class="h-40 w-40" />
      <p class="text-sky-400 mt-2">Logan</p>
      <p>
        <strong>L’esprit créatif</strong> de l’équipe, créant des visuels relaxants et magnifiques.
      </p>
    </div>
    <div
      class="flex flex-col items-center mx-5 lg:mx-10 rounded shadow-2xl  h-full p-9 mt-10"
    >
      <avatar_chloe class="h-40 w-40" />
      <p class="text-sky-400 mt-2">Chloé</p>
      <p>
        Chloé se charge du <strong>développement du site</strong>, vous permet de naviguer
        facilement et de vous faire passer un bon temps sur PuryMind.
      </p>
    </div>
    <div
      class="flex flex-col items-center mx-5 lg:mx-10 rounded shadow-2xl  h-full p-9 mt-10"
    >
    <avatar_noelie class="h-40 w-40" />
      <p class="text-sky-400 mt-2">Noélie</p>
      <p>
        Noélie est la personne chargée de la <strong>communication</strong>, elle vous fait rêver à
        travers tous ses postes
      </p>
    </div>
  </div>
</template>