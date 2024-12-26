"use server"
import { ApiError, isApiError, isWordpressError } from "@/lib/type-guards";
import { wordpressClient } from "@/lib/wordpress/http";


export async function contactUsDetails(formData: FormData): Promise<any | ApiError> {

    try {
        const res = await wordpressClient({
            endpoint: '/contact-form-7/v1/contact-forms/47273/feedback',
            method: 'POST',
            body: formData, // Send FormData directly
        });


        if (isWordpressError(res)) {
            return {
                message: res.message,
                status: res.data.status,
            };
        }

        return await res.json();
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}

export const ContactUsAction = async (formData: FormData): Promise<any | null> => {
    const response = await contactUsDetails(formData); // Call contactUsDetails

    if (isApiError(response)) {
        return {
            message: response.message, // Handle API errors
        };
    }

    return { data: response }; // Return the response data
};


export async function QuickSupportDetails(formData: FormData): Promise<any | ApiError> {

    try {
        const res = await wordpressClient({
            endpoint: '/contact-form-7/v1/contact-forms/47271/feedback',
            method: 'POST',
            body: formData, // Send FormData directly
        });


        if (isWordpressError(res)) {
            return {
                message: res.message,
                status: res.data.status,
            };
        }

        return await res.json();
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}


export const QuickSupportAction = async (formData: FormData): Promise<any | null> => {
    const response = await QuickSupportDetails(formData); // Call contactUsDetails

    if (isApiError(response)) {
        return {
            message: response.message, // Handle API errors
        };
    }

    return { data: response }; // Return the response data
};
