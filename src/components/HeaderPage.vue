<script setup lang="ts">
import { ref } from 'vue'
import IconLogo from '@/components/icons/IconLogo.vue'

const activeMenu = ref(false)

function closeMenu() {
  activeMenu.value = false
}
</script>

<template>
 <!-- <header class=" top-0 left-0 w-full flex items-center justify-between px-4 gap-8 h-20 ">
    <a href="/">
      <IconLogo />
    </a>
    <button class="h-3 w-6 flex flex-col justify-between lg:hidden"
     @pointerdown="menuIsOpen = !menuIsOpen">
      <span class="block h-[2px] w-full bg-black transition duration-300"
      :class="{'translate-y-[5px] rotate-45':menuIsOpen }"></span>
      <span class="block h-[2px] w-full bg-black transition duration-300"
      :class="{'-translate-y-[5px] -rotate-45':menuIsOpen }"></span>
    </button>
    <nav
      class=" invisible opacity-0 fixed z-10 inset-0 flex flex-col justify-between py-12 px-6 lg:visible lg:opacity-100" 
      :class="{ '!visible !opacity-100': menuIsOpen }"
    >
      <ul class="py-4 px-6 text-gray-900 text-base lg:flex lg:flex-row lg:gap-12">
        <li class="py-4 block" >
          <RouterLink to="/rent" class="">Rent</RouterLink>
        </li>
        <li class="py-4 block">
          <RouterLink to="/buy" class="">Buy</RouterLink>
        </li>
        <li class="py-4 block">
          <RouterLink to="/sell" class="">Sell</RouterLink>
        </li>
        <li class="py-4 block">
          <RouterLink to="/manage-property" class="">Manage Property</RouterLink>
        </li>
        <li class="py-4 block">
          <RouterLink to="/ressources" class="">Ressources</RouterLink>
        </li>
      </ul>

    </nav>
  </header> -->
  <!-- <header>
    <nav class="bg-sky-950 p-6">
      <ul class="flex space-x-80 justify-center">
        <IconLogo />
        <li class="p-4  ">
          <RouterLink to="/" class=" text-emerald-300 underline"> Accueil </RouterLink>
        </li>
        <li class="p-4 ">
          <RouterLink to="/accordeon" class=" text-emerald-300 underline" active-class="text-blue-600 underline"> Accordéon
          </RouterLink>
        </li>
        <li class="p-4">
          <RouterLink to="/boucles" class=" text-emerald-300 underline" active-class="text-blue-600 underline">Boucles
          </RouterLink>
        </li>
        <button @pointerdown="menuIsOpen = !menuIsOpen" aria-controls="mainNav" aria-expanded="true" class="rounded-full border-2 border-emerald-300 bg-emerald-500 px-6">menu
          </button>
      </ul>
          
  
    </nav>
  </header>

  <Transition class="transition-transform duration-1000" enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0" leave-active-class="-translate-x-full">
    <nav id="mainNav" v-show="menuIsOpen" class=" w-screen bg-sky-800 text-emerald-100 flex justify-center py-10">
      <ul>
        <li >
          <RouterLink to="/"> Accueil </RouterLink>
        </li>
        <li >
          <RouterLink to="/accordeon"> Accordéon
          </RouterLink>

        </li>
        <li >
          <RouterLink to="/boucles">Boucles
          </RouterLink>
        </li>
      </ul>
    </nav>
  </Transition>

  -->


  <header class="top-0 left-0 w-full flex items-center justify-between px-4 gap-8 h-20 bg-sky-700">
    <div class="flex items-center">
      <RouterLink to="/">
        <IconLogo />
      </RouterLink>
    </div>

    <div class="flex items-center gap-4 ">
      

      <button
        class="relative z-10 flex h-5 w-8 flex-col justify-between *:h-[2px] *:w-full *:bg-white *:transition-all *:duration-300 *:ease lg:hidden"
        @click="activeMenu = !activeMenu"
      >
        <div :class="{ 'translate-y-[9px] rotate-45 !bg-white': activeMenu }"></div>
        <div :class="{ '!bg-white opacity-0': activeMenu }"></div>
        <div :class="{ '-translate-y-[9px] -rotate-45 !bg-white': activeMenu }"></div>
      </button>

      <nav
        class="invisible fixed inset-0 bg-indigo text-2xl text-white opacity-0 transition-all duration-300 ease-in-out lg:visible lg:relative lg:flex lg:items-center lg:bg-transparent lg:text-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-white lg:opacity-100"
        :class="{ '!visible opacity-100': activeMenu }"
        v-scroll-lock="activeMenu"
      >
        <ul class="mt-[25vh] mx-16 lg:m-5 lg:flex lg:gap-6">
          <li class="menu-item">
            <RouterLink class="menu-link" to="/conservatoire" @click="closeMenu"
              >Le conservatoire</RouterLink
            >
          </li>
          <li class="menu-item">
            <RouterLink class="menu-link" to="/enseignements" @click="closeMenu"
              >Enseignements</RouterLink
            >
          </li>
          <li class="menu-item">
            <RouterLink class="menu-link" to="/events" @click="closeMenu">Agenda</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink class="menu-link" to="/contact" @click="closeMenu">Contact</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink
              class="menu-link lg:bg-black lg:text-white lg:px-8"
              to="/inscription"
              @click="closeMenu"
              >S'inscrire</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

</template>
