import { cartClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { UpdateCustomerAddressPayload, Cart } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

/*
* Update customer.
* 
* @param {UpdateCustomerAddressPayload} payload - The customer address to update.
* @returns {Promise<Cart | ApiError>} A promise that resolves to the cart.
*/
export async function updateCustomer(payload: UpdateCustomerAddressPayload): Promise<Cart | ApiError> {

    const res = await cartClient({
        method: 'POST',
        endpoint: "/cart/update-customer",
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