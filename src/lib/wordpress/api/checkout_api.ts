import { cartClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { Cart, SelectShippingRatePayload, CheckoutResponse, CheckoutPayload, CheckoutOrderPayload } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

/**
 * Checkout.
 * 
 * @param {CheckoutPayload} payload - The package and rate to select.
 * @returns {Promise<CheckoutResponse | ApiError>} A promise returns the full cart response, or an error.
 */
export async function checkout(payload: CheckoutPayload): Promise<CheckoutResponse | ApiError> {

    const res = await cartClient({
        method: 'POST',
        endpoint: "/checkout",
        body: JSON.stringify(payload),
        cache: 'no-cache',
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
 * Checkout.
 * 
 * @param {CheckoutOrderPayload} payload - The package and rate to select.
 * @returns {Promise<CheckoutResponse | ApiError>} A promise returns the full cart response, or an error.
 */
export async function checkoutOrder({
    id,
    payload
}: {
    id: number;
    payload: CheckoutOrderPayload
}): Promise<string | ApiError> {

    const res = await cartClient({
        method: 'POST',
        endpoint: "/checkout/" + id,
        body: JSON.stringify(payload),
        cache: 'no-cache',
    });

    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    let data = await res.text();
    return data;
}

/**
 * Get Order
 */