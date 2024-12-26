'use server'

import { LoginFormSchema, LoginFormState, RegisterFormSchema, RegisterFormState } from './definitions';
import { login, register, getOrders as getOrdersApi } from '@/lib/wordpress';
import type { LoginPayload, Order } from '@/lib/wordpress/types';
import { ApiError, isApiError } from '@/lib/type-guards';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';

// const userProtection = process.env.USER_PROTECTION === 'TRUE';
// const username = process.env.USER_PROTECTION_USERNAME ?? '';

export type OrderListType = {
    totalItems: number;
    totalPage: number;
    orders: Order[];
}
const apikey = process.env.SMS_API_KEY

export async function loginAction(state: LoginFormState, formData: FormData) {
    const loginType = formData.get("type");
    if (loginType === "google") {
        const idToken = formData.get("idToken");
        if (!idToken) {
            return {
                errors: {
                    idToken: ["Google ID Token is missing"],
                    username: undefined,
                    password: undefined,
                },
            };
        }
        const googlePayload: LoginPayload = {
            idToken: idToken.toString(),
            type: "google", 
        };
        const res = await login(googlePayload);
        if (isApiError(res)) {
            return {
                message: res.message,
            };
        }

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        // Store the token in cookies
        cookies().set("User-Token", res.token, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });

        revalidateTag(TAGS.cart);
        redirect("/my-account");

    } else if (loginType === "password") {

        const validatedFields = LoginFormSchema.safeParse({
            username: formData.get("username"),
            password: formData.get("password"),
        });
        // if (userProtection && formData.get('username') !== username && formData.get('username')) {
        //     return {
        //         errors: {
        //             username: ['Not allowed login'],
        //         },
        //     }
        // }

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }
        const res = await login(validatedFields?.data);
        if (isApiError(res)) {
            return {
                message: res.message,
            };
        }
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        // Store the token in cookies
        cookies().set("User-Token", res.token, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });
        revalidateTag(TAGS.cart);
        redirect("/my-account");
    }
    else{
        return {
            message: 'Invalid login type',
        };
    }
}


// export async function loginAction(state: LoginFormState, formData: FormData) {
//     console.log("formData", formData);

//     // Determine the login type
//     const loginType = formData.get('type');

//     if (loginType === 'google') {
//         // Handle Google Login
//         const idToken = formData.get('idToken');
//         if (!idToken) {
//             return {
//                 errors: { idToken: ['Google ID Token is missing'] },
//             };
//         }

//         // Prepare payload for Google login
//         const googlePayload = { idToken: idToken.toString(), type: 'google' };

//         // Call the API for Google login
//         const res = await login(googlePayload);

//         // Handle API errors
//         if (isApiError(res)) {
//             return {
//                 message: res.message,
//             };
//         }

//         const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//         // Store the token in cookies
//         cookies().set('User-Token', res.token, {
//             httpOnly: true,
//             secure: true,
//             expires: expiresAt,
//             sameSite: 'lax',
//             path: '/',
//         });

//         revalidateTag(TAGS.cart);
//         redirect('/my-account');

//         return undefined;
//     } else{
//         // Handle Username/Password Login
//         const validatedFields = LoginFormSchema.safeParse({
//             username: formData.get('username'),
//             password: formData.get('password'),
//         });

//         // If validation fails, return early with errors
//         if (!validatedFields.success) {
//             return {
//                 errors: validatedFields.error.flatten().fieldErrors,
//             };
//         }

//         // Prepare payload for username/password login
//         const userPayload = {
//             username: validatedFields.data.username,
//             password: validatedFields.data.password,
//         };

//         const res = await login(userPayload);

//         // Handle API errors
//         if (isApiError(res)) {
//             return {
//                 message: res.message,
//             };
//         }

//         const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//         // Store the token in cookies
//         cookies().set('User-Token', res.token, {
//             httpOnly: true,
//             secure: true,
//             expires: expiresAt,
//             sameSite: 'lax',
//             path: '/',
//         });

//         revalidateTag(TAGS.cart);
//         redirect('/my-account');

//         return undefined;
//     } 
    
// }

export async function registerAction(state: RegisterFormState, formData: FormData) {
    // Validate form fields
    const validatedFields = RegisterFormSchema.safeParse({
        user_login: formData.get('user_login'),
        password: formData.get('password'),
        email: formData.get('email'),
        agree_privacy_term: !!formData.get('agree_privacy_term'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await register(validatedFields.data);
    if (isApiError(res)) {
        return {
            message: res.message,
        }
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store the token in cookies
    cookies().set('User-Token', res.token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    revalidateTag(TAGS.cart);
    redirect('/my-account');

    return undefined;
}

export async function getOrders(userId: string, page: number): Promise<OrderListType | ApiError> {

    const res: Response | ApiError = await getOrdersApi({
        customer: userId,
        page: page,
    });

    if (isApiError(res)) {
        return res;
    }

    const data: Order[] = await res.json();

    return {
        totalItems: Number(res.headers.get('X-WP-Total') ?? "0"),
        totalPage: Number(res.headers.get('X-WP-TotalPages') ?? "0"),
        orders: data,
    };
}


export async function handleOtpMobileSubmit(mobile: string) {
    if (mobile.length !== 10) {
        return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    try {
        const response = await fetch("https://www.smsalert.co.in/api/mverify.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apikey: apikey, // Use environment variable for security
                sender: 'SNDAPP',
                mobileno: mobile,
                template: 'Otp for Login on StarAndDaisy is [otp length="6" retry="3" validity="5"] and valid till 2 minutes. Do not share OTP to anyone for security resons. Best Regards Team StarAndDaisy',
            }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            return { success: true }; // Inform the client that OTP was sent successfully
        } else {
            return { success: false, message: 'Failed to send OTP. Please try again.' };
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: 'An error occurred while sending OTP. Please try again later.' };
    }
}


export async function handleOtpSubmit(mobile:string, otp:string) {
    if (!mobile || mobile.length !== 10 || otp.length !== 6) {
        return { success: false, message: 'Invalid mobile number or OTP.' };
    }

    try {
        const response = await fetch("https://www.smsalert.co.in/api/mverify.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apikey: apikey,
                mobileno: mobile,
                code: otp,
            }),
        });

        if (response.status === 200) {
            return { success: true }; // OTP verified successfully
        } else {
            return { success: false, message: 'Invalid OTP. Please try again.' };
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, message: 'An error occurred while verifying OTP. Please try again later.' };
    }
}