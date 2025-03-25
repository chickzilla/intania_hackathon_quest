import {z} from 'zod'

export const signInSchema = z.object({
    email: z.string().min(1, {message: 'Please enter email'}).email({message: "email is invalid"}),
    password: z.string().min(1, {message: 'Please enter password'}),
}) 