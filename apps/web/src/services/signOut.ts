'use server'

import { cookies } from "next/headers";

export default async function SignOut() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/sign-out`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        //credentials: "include",
    });

    cookies().set("auth_token", "", {httpOnly: true, sameSite: "none", secure: true, maxAge: 0, domain: '.textmoods.com'
    });

    return await response.json();
}