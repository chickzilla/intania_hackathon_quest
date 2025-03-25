import {z} from 'zod'

export const signUpSchema = z.object({
    email: z.string().min(1, {message: 'Please enter email'}).email({message: "email is invalid"}),
    password: z.string().min(1, {message: 'Please enter password'}),
    confirmPassword: z.string().min(1, {message: 'Please enter confirm password'})
}) .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
});