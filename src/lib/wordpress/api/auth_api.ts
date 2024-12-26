import { wordpressClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { LoginPayload, AuthResponse, UserType, RegisterPayload } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

/**
 * Login.
 * 
 * @param {LoginPayload} payload - The package and rate to select.
 * @returns {Promise<AuthResponse | ApiError>} A promise returns the full cart response, or an error.
 */
export async function login(payload: LoginPayload): Promise<AuthResponse | ApiError> {

    const res = await wordpressClient({
        method: 'POST',
        endpoint: "/app-builder/v1/login",
        body: JSON.stringify(payload),
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    let data = await res.json();
    return data;
}

/**
 * Register.
 * 
 * @param {RegisterPayload} payload - The package and rate to select.
 * @returns {Promise<AuthResponse | ApiError>} A promise returns the full cart response, or an error.
 */
export async function register(payload: RegisterPayload): Promise<AuthResponse | ApiError> {

    const res = await wordpressClient({
        method: 'POST',
        endpoint: "/app-builder/v1/register",
        body: JSON.stringify(payload),
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    let data = await res.json();
    return data;
}

/**
 * Current user.
 * 
 * @param {token} string - The token.
 * @returns {Promise<UserType | undefined>} A promise returns the full cart response, or an error.
 */
export async function currentUser(token?: string): Promise<UserType | undefined> {

    if (!token) {
        return undefined;
    }

    const res = await wordpressClient({
        endpoint: "/app-builder/v1/current",
        cache: 'no-cache',
        query: {
            'app-builder-decode': true,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (isWordpressError(res)) {
        // Delete cookie if user is not found
        return undefined;
    }

    let data = await res.json();
    return data;
}