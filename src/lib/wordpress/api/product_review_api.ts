import { cookies } from 'next/headers';
import { isWordpressError } from '@/lib/type-guards';

import { wcClient, wordpressClient } from '@/lib/wordpress/http';

import type { CreateRewviewPayload, ReviewCommentType } from '@/lib/wordpress/types/review_product_type';
import type { ApiError, WordpressError } from '@/lib/type-guards';

/**
 * Prepare the response object.
 *
 * @param {Response | WordpressError} res - The response from client.
 * @returns {Promise<T | ApiError>} - A promise that resolves to the response object or an error object.
 */
async function get_response<T>(res: Response | WordpressError): Promise<T | ApiError> {
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status
        };
    }

    return await res.json();
}

/**
 * Get product review.
 * 
 * @returns {Promise<ReviewCommentType[] | undefined>} - A promise that resolves to the cart.
 */
export async function getProductReviews(query: {[key: string]: any}): Promise<ReviewCommentType[] | ApiError> {
    const res = await wcClient({
        endpoint: "/wc/v3/products/reviews",
        method: 'GET',
        query: query,
    });
    
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status
        };
    }

    return await res.json();
}

/**
 * Create product review.
 * 
 * @returns {Promise<ListView | undefined>} - A promise that resolves to the cart.
 */
export async function createProductReview(data: CreateRewviewPayload): Promise<ReviewCommentType | ApiError> {
    const token = cookies().get("User-Token")?.value;
    let formData = new FormData();    //formdata object

    formData.append('product_id', `${data.product_id}`);   //append the values with key, value pair
    formData.append('review', data.review);
    formData.append('reviewer', data.reviewer);
    formData.append('reviewer_email', data.reviewer_email);
    formData.append('rating', `${data.rating}`);

    const res = await wordpressClient({
        endpoint: "/app-builder/v1/reviews",
        method: 'POST',
        cache: 'no-cache',
        query: {
            'app-builder-decode': true
        },
        body: formData,
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
    });

    return await get_response<ReviewCommentType>(res);
}