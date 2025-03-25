import { trpc } from "@/app/trpc";

export default async function SignUp({
    email, password
}: {email:string, password:string}) {
    
    const jwt = await trpc.auth.sigUp.mutate({ email, password });

    if (!jwt) {
        throw new Error("Failed to sign up");
    }

    return jwt;
}