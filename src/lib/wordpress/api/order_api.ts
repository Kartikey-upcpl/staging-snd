import { wcClient } from '@/lib/wordpress/http';

import { ApiError, isWordpressError, WordpressError } from '@/lib/type-guards';
import type { Order } from '@/lib/wordpress/types';

/**
 * Get order list.
 * 
 * @param query - The query of the order list.
 * 
 * @returns A promise that respone to the order list.
 */
export async function getOrders(query: { [key: string]: any }): Promise<Response | ApiError> {
    const res: Response | WordpressError = await wcClient({
        endpoint: "/wc/v3/orders",
        method: 'GET',
        query: query,
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        }
    }
    return res;
}

/**
 * Get order by id.
 * 
 * @param {number} id - The id of the order.
 * 
 * @returns {Promise<Response | ApiError>} A promise that respone to the order.
 */
export async function getOrder(id: number): Promise<Order | ApiError> {
    const res: Response | WordpressError = await wcClient({
        endpoint: `/wc/v3/orders/${id}`,
        method: 'GET',
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        }
    }
    return await res.json();
}


