'use server'
import { cookies } from 'next/headers'
export default async function SignIn({
    email, password
}: {email:string, password:string}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        //credentials: "include",
    });

    const responseData = await response.json();

    if (responseData?.response) {
        cookies().set("auth_token", responseData.response, {
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            domain: '.textmoods.com'
        });    }


    return responseData;
}