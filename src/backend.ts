import PocketBase from 'pocketbase';
import { type TypedPocketBase } from './pocketbase-types.js';

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase;

export async function Adduser(formData: FormData) {
    try {
        // Ajoutez le champ passwordConfirm à formData
        formData.append('passwordConfirm', formData.get('password'));
        const record = await pb.collection('users').create(formData, {
            $autoCancel: false,
        });
        return record;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        throw new Error('Erreur lors de la création de l\'utilisateur : ' + error.message);
    }
}

export async function signIn(user: { email: string, password: string }) {
    try {
        const record = await pb.collection('users').authWithPassword(user.email, user.password);
        return record;
    } catch (error) {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
}

const POCKETBASE_URL = 'http://127.0.0.1:8090';

export async function savePhoto(photoDataUrl: string, date: string, lieu: string): Promise<any> {
    try {
        const response = await fetch(photoDataUrl);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('photo', blob, 'photo.png');
        formData.append('date_de_la_photo', date);
        formData.append('lieu', lieu);

        const record = await pb.collection('Souvenirs_photos').create(formData);
        return record;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la photo :', error);
        throw error;
    }
}
