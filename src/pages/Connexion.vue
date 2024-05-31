<script setup lang="ts">
import {ref} from 'vue'
import pocketbase from 'pocketbase'
import { signIn } from '@/backend';
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()

const data = ref({
    email: "",
    password: "",
});

const handleValidation = async () => {
    if (data.value.email === "" || data.value.password === "") {
        console.log("Veuillez remplir tous les champs");
    } else {
        try {
            await signIn(data.value);
            router.push('../');
            console.log(data.value)
        } catch (error) {
            console.log("Erreur de connexion");
        }
    }
}

console.log('coucou' + data.value)
</script>

<template>
    <div class="w-screen h-screen mt-20 px-5 flex flex-col gap-5 "  v-scroll-lock="true">
        <div class="flex flex-col gap-8">
            <h1 class="flex justify-center mt-10 font-Marigny font-bold text-4xl">
                Connexion
            </h1>
        </div>
        <div class="container mx-auto mt-2">
        <form class="max-w-md mx-auto text-black">
            <div class="mb-5">
                <input type="email" id="email" v-model="data.email" class="w-full font-light placeholder:text-black px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md" placeholder="Email" />
            </div>
            <div class="mb-5">
                <input type="password" id="password" v-model="data.password" class="w-full placeholder:text-black font-light px-4 py-2 border-white border-2 bg-slate-200/50 rounded-md" placeholder="Mot de passe"/>
            </div>
            <div class="flex justify-center lg:justify-center lg:pt-8">
                <Button url="" text="Se connecter" />    
            </div>
        </form>
    </div>
    </div>
</template>
