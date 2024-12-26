import { ReviewCommentType } from '@/lib/wordpress/types';
import { z } from 'zod'

export const CreateReviewFormSchema = z.object({
    product_id: z.number(),   
    review: z
        .string()
        .min(2, { message: 'Review must be at least 2 characters long.' })
        .trim(),
    reviewer: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    reviewer_email: z
        .string()
        .email({ message: 'The email address is invalid.' })
        .trim(),
    rating: z.number(),
});

export type CreateReviewFormState =
    | {
        errors?: {
            review?: string[]
        },
        message?: string,
        data?: ReviewCommentType,
    }
    | undefined;