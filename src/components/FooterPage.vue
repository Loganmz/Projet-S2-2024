
<script setup lang="ts">

import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconTiktok from '@/components/icons/IconTiktok.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { RouterLink } from 'vue-router'


</script>

<template>
   <footer class="bg-gradient-to-b from-sky-400 to-sky-700 space-y-10 pt-20 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-y-0 bottom-0 w-full">
    <IconLogo class=" mx-auto lg:col-span-1" />
    <nav
      class="px-5 columns-1 text-center gap-8 space-y-8 lg:columns-2 lg:col-span-3 lg:px-0 *:break-inside-avoid *:space-y-3 lg:text-left"
    >
      <div>
        <ul class="text-white font-bold text-base lg:text-base">
          <li><RouterLink to="/CalmSession">Session calme</RouterLink></li>
          <li><RouterLink to="/voirSouvenir">Voir un souvenir</RouterLink></li>
          <li><RouterLink to="/Citation">Voir une citation inspirante</RouterLink></li>
          <li><RouterLink to="/creerSouvenir">Créer un souvenir</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>

        </ul>
      </div>
      <div class="break-inside-avoid space-y-3">
        <ul class="text-white text-sm lg:text-base">
          <li><RouterLink to="/mentionLegal">Mentions légales</RouterLink></li>
          <li><RouterLink to="/politiqueConfidentialite">Politique de confidentialité</RouterLink></li>
          <li><RouterLink to="/cgu">Conditions générale d'utilisations</RouterLink></li>
          <li><RouterLink to="/cookies">Cookies</RouterLink></li>
          <li><RouterLink to="/cgv">Conditions générale de vente</RouterLink></li>
          
        </ul>
      </div>
    </nav>
    <div
      class="px-5 text-white py-8 space-y-6 text-center lg:col-span-4 lg:flex lg:justify-around lg:items-center lg:space-y-0"
    >
      <p>©2024 PuryMind All rights reserved</p>
      <ul class="flex gap-12 justify-center">
        <li>
          <a href="#" aria-label="Facebook"
            ><IconFacebook class="fill-white" aria-hidden="true"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="Instagram"
            ><IconInstagram class="fill-white" aria-hidden="true"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="Twitter"
            ><IconTwitter class="fill-white" aria-hidden="true"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="Linkedin"
            ><IconLinkedin class="fill-white" aria-hidden="true"
          /></a>
        </li>
        <li>
          <a href="#" aria-label="Tiktok"
            ><IconTiktok class="fill-white" aria-hidden="true"
          /></a>
        </li>
      </ul>
    </div>
  </footer>

</template>