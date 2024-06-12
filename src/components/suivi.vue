<script setup lang="ts">
import good from '@/components/icons/good.vue'
import better from '@/components/icons/better.vue'
import notgood from '@/components/icons/notgood.vue'
import imok from '@/components/icons/imok.vue'

import { ref } from 'vue';

// Variable réactive pour suivre l'icône sélectionnée
const selectedIcon = ref('');

// Gestionnaire d'événements pour mettre à jour l'icône sélectionnée lors du clic
const handleClick = (icon: string) => {
  selectedIcon.value = icon;
};
</script>


<template>
     <div class="grid pt-6 grid-cols-4">
          <div @click="selectedIcon = 'good'">
            <RouterLink to="#">
              <good :fill="selectedIcon === 'good' ? '#BAE6FD' : 'none'"/>
              <p>Très bien</p>
            </RouterLink>
          </div>
          <div @click="selectedIcon = 'imok'">
            <RouterLink to="#">
              <imok :fill="selectedIcon === 'imok' ? '#BAE6FD' : 'none'"/>
              <p>Bien</p>
            </RouterLink>
          </div>
          <div @click="selectedIcon = 'better'">
            <RouterLink to="#">
              <better :fill="selectedIcon === 'better' ? '#BAE6FD' : 'none'"/>
              <p>Cela pourrait aller mieux</p>
            </RouterLink>
          </div>
          <div @click="selectedIcon = 'notgood'">
            <RouterLink to="#">
              <notgood :fill="selectedIcon === 'notgood' ? '#BAE6FD' : 'none'"/>
              <p>Pas bien</p>
            </RouterLink>
          </div>
        </div>
</template>