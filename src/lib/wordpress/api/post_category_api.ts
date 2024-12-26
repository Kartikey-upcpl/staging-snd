import { wordpressClient } from '@/lib/wordpress/http';

import type { PostCategory } from '@/lib/wordpress/types';
import { ApiError, isWordpressError, WordpressError } from '@/lib/type-guards';

/**
 * Get post category by slug.
 * 
 * @param slug - The slug of the post category.
 * 
 * @returns A promise that resolves to the post category.
 */
export async function getPostCategoryBySlug(slug: string): Promise<PostCategory | undefined | ApiError> {
    const res: Response | WordpressError = await wordpressClient({
        endpoint: "/wp/v2/categories",
        method: 'GET',
        query: {
            slug: slug
        },
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        };
    }

    const data: PostCategory[] = await res.json()
    return data[0];
}
