import { wordpressClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { Addresses } from '@/lib/wordpress/types/addresses_type';
import type { ApiError  } from '@/lib/type-guards';
import { TAGS } from '@/lib/constants';

/**
 * Get addresses.
 * @returns A promise that resolves to the addresses.
 */
export async function getAddresses(country?: string) : Promise<Addresses | ApiError> {
    const res = await wordpressClient({
        endpoint: "/app-builder/v1/address",
        query: {
           ...(country && { country }),
        },
        tags: [TAGS.addresses],
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