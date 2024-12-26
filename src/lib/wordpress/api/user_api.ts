import { isWordpressError } from '@/lib/type-guards';
import type { WpUser } from '@/lib/wordpress/types/user_type';

import { wordpressClient } from '@/lib/wordpress/http';

/**
 * Retrieves a WordPress user by its slug.
 * @param id - The id of the user to retrieve.
 * @returns A promise that resolves to a `WpPost` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function getWpUser(id: number): Promise<WpUser | undefined> {
    const res = await wordpressClient({
        endpoint: `/wp/v2/user/${id}`,
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    const data: WpUser = await res.json();

    return data;
}