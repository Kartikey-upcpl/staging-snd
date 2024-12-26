import { cookies } from 'next/headers';
import { ApiError, isWordpressError } from '@/lib/type-guards';
import type { ReviewPostType, CreatePostReviewPayload, WPPostReviewPagination } from '@/lib/wordpress/types/review_post_type';

import { wordpressClient } from '@/lib/wordpress/http';

/**
 * Retrieves a WordPress post review.
 * @param query - The query of the post review to retrieve.
 * @returns A promise that resolves to a `ReviewPostType` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function getPostReviews(query: {[key: string]: any}): Promise<ReviewPostType[]> {
    const res = await wordpressClient({
        endpoint: "/wp/v2/comments",
        method: 'GET',
        query: query,
        cache: "no-cache"
    });

    if (isWordpressError(res)) {
        return [];
    }

    const data: ReviewPostType[] = await res.json();

    return data;
}

/**
 * Retrieves a WordPress review post pagination.
 * @param query - The query of the review postpost.
 * @returns A promise that resolves to the retrieved review post
 */
export async function getPostReviewsWithPagination(query?: { [key: string]: any }): Promise<WPPostReviewPagination | ApiError> {
    const res = await wordpressClient({
        endpoint: "/wp/v2/comments",
        method: 'GET',
        query: query,
        cache: "no-cache"
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        };
    }

    const data: ReviewPostType[] = await res.json();
    const totalItem = Number(res.headers.get("X-Wp-Total"));
    const totalPage = Number(res.headers.get("X-Wp-Totalpages"));

    return {
        totalItem: totalItem,
        totalPage: totalPage,
        data: data,
    };
}

/**
 * Create a WordPress post review.
 * @param data - The data of the post review to retrieve.
 * @returns A promise that resolves to a `ReviewPostType` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function createPostReview(data: CreatePostReviewPayload): Promise<ReviewPostType | ApiError> {
    const token: string | undefined = cookies().get("User-Token")?.value;

    const res = await wordpressClient({
        endpoint: "/wp/v2/comments",
        method: 'POST',
        query: {
            ...data,
          'app-builder-decode': true,
        },
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        cache: "no-cache"
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message
        };
    }

    const reviewData: ReviewPostType= await res.json();

    return reviewData;
}