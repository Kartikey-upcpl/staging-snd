import { cartClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { Cart, SelectShippingRatePayload } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

/**
 * Selects an available shipping rate for a package
 * 
 * @param {SelectShippingRatePayload} payload - The package and rate to select.
 * @returns {Promise<Cart | ApiError>} A promise returns the full cart response, or an error.
 */
export async function selectShippingRate(payload: SelectShippingRatePayload): Promise<Cart | ApiError> {

    const res = await cartClient({
        method: 'POST',
        endpoint: "/cart/select-shipping-rate",
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