<script setup lang="ts">
//

import { useHead } from '@unhead/vue'
useHead({
  title: 'Contact | PuryMind',
    meta: [
        {
        name: 'description',
        content: 'Contactez-nous pour toute question, demande ou suggestion. Nous sommes là pour vous aider à trouver l’équilibre et l’épanouissement personnel.'
        }
    ]
})
</script>

<template>
    <section class=" mx-7 justify-center text-black lg:mx-40" >
    <h1 class="m-7 text-center text-3xl font-bold lg:text-4xl ">Nous contacter</h1>
    <p class=" mb-6 font-montserrat text-base font-normal leading-normal lg:text-lg">Bienvenue sur notre espace dédié au bien-être et à l'épanouissement personnel. Nous sommes ravis de vous accueillir ici, prêts à répondre à toutes vos questions, demandes ou suggestions. </p>
    <p class=" mb-6 font-montserrat text-base font-normal leading-normal lg:text-lg">N'hésitez pas à nous contacter pour partager vos pensées, explorer nos services ou simplement échanger sur le chemin vers une vie plus équilibrée et épanouissante.</p>
    
    <form action="/submit_contact" method="post" class="space-y-4">
        <div>
            <label for="fname" class="block text-base font-medium text-sky-400 lg:text-xl">Prénom</label>
            <input type="text" id="fname" name="fname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="ex : Lucas">
        </div>
        <div>
            <label for="lname" class="block text-base font-medium text-sky-400 lg:text-xl">Nom</label>
            <input type="text" id="lname" name="lname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="ex : Dupont">
        </div>
        <div>
            <label for="email" class="block text-base font-medium text-sky-400 lg:text-xl">Adresse email</label>
            <input type="email" id="email" name="email" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="ex : lucas.dupont@gmail.com">
        </div>
        <div>
            <label for="subject" class="block text-base font-medium text-sky-400 lg:text-xl">Objet</label>
            <input type="text" id="subject" name="subject" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="ex : Renseignement sur l’abonnement premium">
        </div>
        <div>
            <label for="message" class="block text-base font-medium text-sky-400 lg:text-xl">Message</label>
            <textarea id="message" name="message" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="ex : Bonjour, j’aimerai..."></textarea>
        </div>
        <div class="flex justify-center items-center">
            <button type="submit" class="m-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-black hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 lg:text-xl">
                Envoyer
            </button>
        </div>
    </form>
</section>
</template>