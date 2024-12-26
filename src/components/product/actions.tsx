'use server'

import { cookies } from 'next/headers';

import { CreateReviewFormSchema, CreateReviewFormState } from './definitions';
import { createProductReview, getProductVariations as getProductVariationsApi, getProductReviews } from '@/lib/wordpress';
import { CreateRewviewPayload, ProductVariations, ReviewCommentType } from '@/lib/wordpress/types';
import { ApiError, isApiError } from '@/lib/type-guards';
import { CURRENCY_PARAM } from '@/utlis/currency';
import { time } from 'console';
import { fetchPincodeCheck } from '@/lib/wordpress/api/pincode_check_api';
import { PincodeCheckerResponse } from '@/lib/wordpress/types/pincode_type';
import { fetchOrderTrackingDetails } from '@/lib/wordpress/api/track_order_api';

export async function getReviews(query: { [key: string]: any }): Promise<ReviewCommentType[] | ApiError> {
    return await getProductReviews(query);
}

export async function addReview(state: CreateReviewFormState, data: CreateRewviewPayload) {
    // Validate form fields
    const validatedFields = CreateReviewFormSchema.safeParse(data);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await createProductReview(validatedFields.data);
    if (isApiError(res)) {
        return {
            message: res.message,
        }
    }

    return {
        data: res,
    };
}

export async function getProductVariations(id: number): Promise<ProductVariations | ApiError> {
    const cookieStore = cookies();

    const lang = cookieStore.get('lang')?.value;
    const currency = cookieStore.get('currency')?.value;

    const query = {
        product_id: id,
        ...(!!lang && { lang: lang }),
        ...(!!currency && { [CURRENCY_PARAM]: currency }),
    };

    const data: ProductVariations | ApiError = await getProductVariationsApi(query);

    return data;
}

export const checkPincode = async (
    zipcode: string
): Promise<{ data?: PincodeCheckerResponse[]; message?: string } | null> => {

    const response = await fetchPincodeCheck(zipcode);

    // Check if the response is an error
    if (isApiError(response)) {
        return {
            message: response.message, // Return the error message
        };
    }

    // Handle the case where the response is valid data
    return {
        data: response as PincodeCheckerResponse[], // Ensure correct type for 'data'
    };
};


export const trackOrder = async (
    orderId: string,
) => {

    const response = await fetchOrderTrackingDetails(orderId,);
    if (isApiError(response)) {
        return {
            message: response.message,
        };
    }

    return {
        data: response
    };
};