import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

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
