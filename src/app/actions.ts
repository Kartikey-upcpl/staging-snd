'use server'

import { isApiError } from '@/lib/type-guards';
import { createCart, getSettings, currentUser } from '@/lib/wordpress';
import { cookies } from 'next/headers';

export async function initCart() {
    // Set the cart token in the cookie
    const cookieStore = cookies();

    // Clear the cart token and nonce
    cookieStore.delete('Cart-Token');
    cookieStore.delete('Nonce');

    const res = await createCart();
    if (!isApiError(res)) {
        // Set the cart token and nonce
        cookieStore.set('Cart-Token', res.get('Cart-Token') || '');
        cookieStore.set('Nonce', res.get('Nonce') || '');
    }
}

export async function initSetting() {
    const cookieStore = cookies();

    const lang = cookieStore.get('lang')?.value;
    if (lang) {
        return;
    }

    const res = await getSettings(lang ?? 'en');

    if (!isApiError(res)) {
        cookieStore.set('lang', res.language);
        cookieStore.set('currency', res.currency);
    }
}

/**
 * The token exists in the cookie, but the user may not be logged in. So we need to verify the user and delete the token.
 */
export async function verifyUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('User-Token')?.value;
    if (token) {
        const res = await currentUser(token);
        if (!res) {
            cookieStore.delete('User-Token');
        }
    }
}