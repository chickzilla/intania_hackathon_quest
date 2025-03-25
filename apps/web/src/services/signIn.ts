'use server'
import { trpc } from '@/app/trpc';
export default async function SignIn({
    email, password
}: {email:string, password:string}) {
   
   const jwt = await trpc.auth.signIn.mutate({ email, password });

    if (!jwt) {
        console.log("Failed to sign in service no jwt");
        throw new Error("no jwt");
    }

    return jwt;
}