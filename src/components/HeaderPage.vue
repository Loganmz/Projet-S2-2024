<script setup lang="ts">
import { ref } from 'vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconTiktok from '@/components/icons/IconTiktok.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconProfil from '@/components/icons/IconProfil.vue'

const activeMenu = ref(false)

function closeMenu() {
  activeMenu.value = false
}
</script>

<template>
 
  <header
    class="top-0 left-0 w-screen flex items-center justify-between px-10 h-24 bg-gradient-to-r from-sky-400 to-sky-700"
  >
  
    <div class="flex items-center">
      <RouterLink to="/">
        <IconLogo />
      </RouterLink>
    </div>
    <div class="flex items-center gap-4">
      <RouterLink to="/profile">
        <IconProfil />
      </RouterLink>
      <button class="relative z-50 flex h-5 w-8 flex-col justify-between *:h-[2px] *:w-full *:bg-white *:transition-all *:duration-300 *:ease lg:hidden" @click="activeMenu = !activeMenu">
        <div :class="{ 'translate-y-[9px] rotate-45 !bg-white': activeMenu }"></div>
        <div :class="{ '!bg-white opacity-0': activeMenu }"></div>
        <div :class="{ '-translate-y-[9px] -rotate-45 !bg-white': activeMenu }"></div>
      </button>

      <nav
        class="invisible fixed inset-0 z-40 bg-indigo text-2xl text-white bg-sky-700 opacity-0 transition-all duration-300 ease-in-out lg:visible lg:relative lg:flex lg:items-center lg:bg-transparent lg:text-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-white lg:opacity-100"
        :class="{ '!visible opacity-100': activeMenu }"
        v-scroll-lock="activeMenu"
      >
        <ul class="mt-[15vh] text-center lg:m-5 lg:flex lg:gap-6">
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/CalmSession" @click="closeMenu"
              >Session calme</RouterLink
            >
          </li>
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/voirSouvenir" @click="closeMenu"
              >Voir un souvenir</RouterLink
            >
          </li>
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/citation" @click="closeMenu"
              >Voir une citation inspirante</RouterLink
            >
          </li>
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/creerSouvenir" @click="closeMenu"
              >Créer un souvenir</RouterLink
            >
          </li>
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/contact" @click="closeMenu">Contact</RouterLink>
          </li>
          <li class="menu-item mb-10">
            <RouterLink class="menu-link" to="/APropos" @click="closeMenu">À propos</RouterLink>
          </li>
        </ul>
        <ul class="flex gap-12 justify-center lg:hidden">
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
            <a href="#" aria-label="Tiktok"><IconTiktok class="fill-white" aria-hidden="true" /></a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  
</template>
