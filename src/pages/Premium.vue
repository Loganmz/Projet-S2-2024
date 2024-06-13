<script setup lang="ts">
import iconCheck from '@/components/icons/iconRoundcheck.vue'
import Button from '@/components/Button.vue'    
</script>

<template>
    <section class="container pt-8 mb-8">
    <h1 class="text-3xl font-bold">Abonnement</h1>
    <h2 class="text-lg font-semibold text-sky-500" >Premium</h2>
    <p class="text-3xl">3,99 € <span class="text-sm ">par mois</span></p>
    <ul class=" pt-6 flex flex-col gap-6">
        <li  class="flex gap-2">
            <iconCheck />
           <p>créer citation</p>
        </li>
        <li class="flex gap-2">
            <iconCheck />
           <p>accès à toutes les session de relaxation </p>
        </li>
        <li class="flex gap-2">
            <iconCheck />
           <p>Souvenir anterieur</p>
        </li>
        <li class="flex gap-2">
            <iconCheck />
           <p>Rappel</p>
        </li>
        
    </ul>
    <div class="flex justify-center mb-2 pt-8 lg:justify-center lg:pt-8">
          <Button url="abonnement" text="S'abonner" />
        </div>
    </section>
</template>