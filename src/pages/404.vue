<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="flex items-center justify-center bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full space-y-8">
      <div class="text-center lg:text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Erreur 404</h2>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Oops! Page non trouvée</h1>
      </div>
      <div
        class="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8"
      >
        <div class="flex-1 flex justify-center lg:justify-start mt-5 lg:mt-9">
          <img
            src="/public/img/img-404.png"
            alt="Erreur 404 Image"
            class="object-cover rounded-lg w-full max-w-sm"
          />
        </div>
        <div class="lg:text-left lg:flex-1">
          <div class="m-7 mb-8 lg:mt-8">
            <p class="text-lg mb-8">
              Oh là là, semble-t-il que vous ayez pris un chemin paisible vers une destination
              inconnue ! Nous nous sommes perdus dans les nuages de la sérénité, et il semble que
              vous aussi.
            </p>
            <p class="text-lg mb-8">
              Ne vous inquiétez pas, respirez profondément et laissez-nous vous ramener sur le
              chemin de la tranquillité.
            </p>
            <p class="text-lg">
              Retournez à la maison de la détente en utilisant le menu de navigation ci-dessus, et
              laissez-nous vous emmener dans un voyage où les soucis sont balayés par les vagues
              apaisantes du bien-être.
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center lg:justify-center lg:pt-8">
        <Button variant="blue" url="" text="Retour à la page d’accueil" />
      </div>
    </div>
  </div>
</template>