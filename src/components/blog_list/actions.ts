'use server'

import { CreatePostReviewFormSchema, CreatePostReviewFormState } from './definitions';
import { createPostReview, getPostReviewsWithPagination } from '@/lib/wordpress';
import type { CreatePostReviewPayload } from '@/lib/wordpress/types';
import { isApiError } from '@/lib/type-guards';


export async function getReviews(query: {[key: string]: any}) {
    return await getPostReviewsWithPagination(query);
}

export async function addReview(state: CreatePostReviewFormState, data: CreatePostReviewPayload) {
    // Validate form fields
    const validatedFields = CreatePostReviewFormSchema.safeParse(data);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await createPostReview(validatedFields.data);
    if (isApiError(res)) {
        return {
            message: res.message,
        }
    }

    return {
        data: res,
    };
}
