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

// export async function updateProfile(userId: string, data: { nom?: string, prenom?: string, photo_de_profil?: string }) {
//   try {
//     const updatedUser = await pb.collection('users').update(userId, data);
//     // Met à jour le modèle d'utilisateur dans le store
//     pb.authStore.model = updatedUser;
//     return updatedUser;
//   } catch (error) {
//     throw new Error('Erreur lors de la mise à jour du profil');
//   }
// }

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



// Fonction pour réinitialiser le mot de passe
export async function resetPassword(token: string, newPassword: string) {
    try {
        console.log('Resetting password with token:', token);
        await pb.collection('users').confirmPasswordReset(token, newPassword, newPassword);
        console.log('Password reset successful');
    } catch (error) {
        console.error('Error resetting password:');
        throw new Error('Error resetting password: ');
    }
}
// Fonction pour demander une réinitialisation de mot de passe
export async function requestPasswordReset(email: string) {
    try {
        await pb.collection('users').requestPasswordReset(email);
    } catch (error) {
        throw new Error('Erreur lors de la demande de réinitialisation de mot de passe: ');
    }
}
