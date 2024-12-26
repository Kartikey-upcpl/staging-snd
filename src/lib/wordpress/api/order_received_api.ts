import { cartClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { OrderReceivedPayload, OrderReceivedResponse } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

/**
 * Checkout.
 * 
 * @param {OrderReceivedPayload} payload - The package and rate to select.
 * @returns {Promise<OrderReceivedResponse | ApiError>} A promise returns the full cart response, or an error.
 */
export async function getOrderReceived(payload: OrderReceivedPayload): Promise<OrderReceivedResponse | ApiError> {
    const endpoint = `/order/${payload.order_id}`;

    const res = await cartClient({
        method: 'GET',
        endpoint,
        query: {
            key: payload.key,
            ...(payload?.billing_email && { billing_email: payload.billing_email }),
        },
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