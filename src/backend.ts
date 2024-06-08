import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'
import axios from 'axios';


export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase


export async function Adduser(event: Object) {
   try {
       const record = await pb.collection('users').create(event);
       return record;
   } catch (error) {
       return error;
   }
}

export async function signIn(user: { email: string, password: string }) {
  try {
    const record = await pb.authStore.signIn(user);
    return record;
  } catch (error) {
    return error;
  }
}


const POCKETBASE_URL = 'http://127.0.0.1:8090';



export async function savePhoto(photoDataUrl: string, date: string, lieu: string): Promise<any> {
  try {
    // Convertir le Data URL en blob
    const response = await fetch(photoDataUrl);
    const blob = await response.blob();

    // Créer FormData pour envoyer le fichier et les autres données
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');
    formData.append('date_de_la_photo', date);
    formData.append('lieu', lieu);

    // Envoyer la requête POST à PocketBase
    const record = await pb.collection('Souvenirs_photos').create(formData);
    return record;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la photo :', error);
    throw error;
  }
}
