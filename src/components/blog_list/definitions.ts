import { ReviewPostType } from '@/lib/wordpress/types';
import { z } from 'zod'

export const CreatePostReviewFormSchema = z.object({
    content: z
        .string()
        .min(2, { message: 'Comment must be at least 2 characters long.' })
        .trim(),
    post: z.number(),
    parent: z.number(),
});

export type CreatePostReviewFormState =
    | {
        errors?: {
            content?: string[],
        },
        message?: string,
        data?: ReviewPostType,
    }
    | undefined;