import { z } from 'zod'

export const LoginFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'The username must be at least 2 characters long.' })
        .trim(),
    password: z
        .string()
        .min(2, { message: 'The password must be at least 2 characters long.' })
        .trim(),
});

export type LoginFormState =
    | {
        errors?: {
            username?: string[]
            password?: string[]
            idToken?: string[];
        }
        message?: string
    }
    | undefined;

export const RegisterFormSchema = z.object({
    user_login: z
        .string()
        .min(2, { message: 'The username must be at least 2 characters long.' })
        .trim(),
    password: z
        .string()
        .min(2, { message: 'The password must be at least 2 characters long.' })
        .trim(),
    email: z
        .string()
        .email({ message: 'The email address is invalid.' })
        .trim(),
    agree_privacy_term: z.boolean(),
    first_name: z
        .string()
        .min(2, { message: 'The first name must be at least 2 characters long.' })
        .trim(),
    last_name: z
        .string()
        .min(2, { message: 'The last name must be at least 2 characters long.' })
        .trim(),
});

export type RegisterFormState =
    | {
        errors?: {
            user_login?: string[]
            password?: string[]
            email?: string[]
            agree_privacy_term?: string[]
            first_name?: string[]
            last_name?: string[]
        }
        message?: string
    }
    | undefined;