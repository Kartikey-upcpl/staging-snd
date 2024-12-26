import { wordpressClient } from '@/lib/wordpress/http';

import { ApiError, WordpressError, isWordpressError } from '@/lib/type-guards';
import type { Media } from '@/lib/wordpress/types/media_type';

/**
 * Get a media by id.
 * 
 * @param id - The id of the media.
 * 
 * @returns A promise that respone to the media.
 */
export async function getMedia(id: string): Promise<Media | ApiError> {
    const res: Response | WordpressError = await wordpressClient({
        endpoint: `/wp/v2/media/${id}`,
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