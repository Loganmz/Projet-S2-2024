import PocketBase from 'pocketbase';
import { type TypedPocketBase } from './pocketbase-types';

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase;



export async function Adduser(formData: FormData) {
    try {
        const password = formData.get('password');
        if (!password) {
            throw new Error('Le champ password est manquant dans formData');
        }
        // Ajoutez le champ passwordConfirm à formData
        formData.append('passwordConfirm', password);
        const record = await pb.collection('users').create(formData, {
            $autoCancel: false,
        });
        return record;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error.message);
            throw new Error('Erreur lors de la création de l\'utilisateur : ' + error.message);
        } else {
            console.error('Une erreur inattendue s\'est produite lors de la création de l\'utilisateur');
            throw error;
        }
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

const POCKETBASE_URL = 'https://app-purymind.noelie-talhouarn.fr/';

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

// // Fonction de demande de réinitialisation de mot de passe
// export async function requestPasswordReset(email: string) {
//   try {
//     await pb.users.requestPasswordReset(email)
//   } catch (error) {
//     console.log(error); // Ajoutez cette ligne
//     throw new Error('Erreur lors de la demande de réinitialisation de mot de passe.')
//   }
// }

// export async function resetPassword(token: string, newPassword: string) {
//   try {
//     await pb.users.confirmPasswordReset(token, newPassword, newPassword)
//   } catch (error) {
//     console.log(error); // Ajoutez cette ligne
//     throw new Error('Erreur lors de la réinitialisation du mot de passe.')
//   }
// }

