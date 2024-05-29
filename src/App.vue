<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import FooterPage from './components/FooterPage.vue'
import HeaderPage from './components/HeaderPage.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})
</script>

<template>
  <HeaderPage />
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
  <div>
    <h1>Connexion</h1>
    <div>
      <p><label>Email : </label><input type="email" id="email" /></p>
      <p><label>Password : </label><input type="password" id="password" /></p>
      <p><label>Name : </label><input type="text" id="name" /></p>
      <p><button v-on:click="signUp()">Sign Up</button></p>
      <button v-on:click="signIn()">Sign In</button>
      <button v-on:click="signOut()">Sign Out</button>
      <label id="status">You are not yet connected !</label>
    </div>
  </div>
  <FooterPage />
</template>
