import { isWordpressError } from '@/lib/type-guards';

import { cookies } from 'next/headers';
import { cartClient } from './http';
import { TAGS } from '../constants';

import type {
    Cart,
    AddToCartPayload,
    RemoveItemPayload,
    UpdateQuantityPayload,
    AddCouponPayload,
    RemoveCouponPayload,
    UpdateShippingMethodPayload,
 } from './types/cart_type';
import type { ApiError, WordpressError } from '@/lib/type-guards';

/**
 * Prepare the response object.
 *
 * @param {Response | WordpressError} res - The response from client.
 * @returns {Promise<Cart | ApiError>} - A promise that resolves to the response object or an error object.
 */
async function get_response(res: Response | WordpressError): Promise<Cart | ApiError> {
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status
        };
    }

    return await res.json();
}

/**
 * Get cart.
 * 
 * @returns {Promise<Cart | undefined>} - A promise that resolves to the cart.
 */
export async function getCart(): Promise<Cart | undefined> {

    if (cookies().get('Cart-Token')?.value === undefined) {
        return undefined;
    }

    const endpoint = '/cart';
    const res = await cartClient({
        endpoint,
        method: 'GET',
        tags: [TAGS.cart],
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    if (cookies().get('Nonce')?.value !== res.headers.get('Nonce')) {
        return undefined;
    }

    return await res.json();
}

/**
 * Create cart
 * 
 * @returns {Promise<Headers | ApiError>} - A promise that resolves to the cart.
 */
export async function createCart(): Promise<Headers | ApiError> {

    const endpoint = '/cart';
    const res = await cartClient({
        endpoint,
        method: 'GET',
        cache: 'no-cache',
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        };
    }

    return res.headers;
}

/**
 * Adds an item to the cart.
 *
 * @param {AddToCartPayload} payload - The payload containing the details of the item to add to the cart.
 * @returns {Promise<Cart | ApiError>} - A promise that resolves to the updated cart or an error object.
 *
 * @example
 * const payload = {
 *   id: 123,
 *   quantity: 2
 * };
 */
export async function addToCart(payload: AddToCartPayload): Promise<Cart | ApiError> {

    const res = await cartClient({
        endpoint: "/cart/add-item",
        method: "POST",
        body: JSON.stringify(payload),
    });

    return await get_response(res);
}

export async function removeItemCart(payload: RemoveItemPayload): Promise<Cart | ApiError> {
    const res = await cartClient({
        endpoint: "/cart/remove-item",
        method: "POST",
        body: JSON.stringify(payload),
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    return await res.json();
}

export async function updateItemCart(payload: UpdateQuantityPayload): Promise<Cart | ApiError> {
    const res = await cartClient({
        endpoint: "/cart/update-item",
        method: "POST",
        query: payload,
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    return await res.json();
}

export async function applyCoupon(payload: AddCouponPayload): Promise<Cart | ApiError> {
    const res = await cartClient({
        endpoint: "/cart/apply-coupon",
        method: "POST",
        query: { code: payload.code },
    });

    return await get_response(res);
}

export async function removeCoupon(payload: RemoveCouponPayload): Promise<Cart | ApiError> {
    const res = await cartClient({
        endpoint: "/cart/remove-coupon",
        method: "POST",
        query: { code: payload.code },
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    return await res.json();
}

export async function updateShipping(payload: UpdateShippingMethodPayload) {
    const res = await cartClient({
        endpoint: "/cart/select-shipping-rate",
        method: "POST",
        query: {
            package_id: payload.packageId,
            rate_id: payload.rateId,
            "app-builder-decode": true,
        },
    });

    return await get_response(res);
}

export async function updateCustomerCart(data: { [key: string]: any }) {
    const res = await cartClient({
        endpoint: "/cart/update-customer",
        method: "POST",
        body: JSON.stringify(data),
    });

    return await get_response(res);
}