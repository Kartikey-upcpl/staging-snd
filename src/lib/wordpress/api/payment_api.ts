import { wcClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { Payment, PaymentPublic } from '@/lib/wordpress/types';
import type { ApiError } from '@/lib/type-guards';

import { TAGS, PAYMENT_METHODS_SUPPORTED } from '@/lib/constants';

/**
 * Get payment methods.
 * 
 * @returns {Promise<Payment | ApiError>} A promise that resolves to the payment methods.
 */
export async function getPaymentMethos(): Promise<Payment[] | ApiError> {
    const res = await wcClient({
        endpoint: "/wc/v3/payment_gateways",
        tags: [TAGS.payment_methods],
    });
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }
    let data = await res.json();
    return data;
}

/**
 * Get payment methods. and not show the private data to the client.
 * 
 * @returns {Promise<PaymentPublic | ApiError>} A promise that resolves to the payment methods.
 */
export async function getPaymentMethosPublic(): Promise<PaymentPublic[] | ApiError> {
    const res = await wcClient({
        endpoint: "/wc/v3/payment_gateways",
        tags: [TAGS.payment_methods],
    });
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    let data = await res.json();
    let methods = data.map((payment: Payment) => {
        return {
            id: payment.id,
            title: payment.title,
            description: payment.description,
            order: payment.order,
            enabled: payment.enabled,
            method_title: payment.method_title,
            method_description: payment.method_description,
        }
    })
        .filter((payment: Payment) => payment.enabled)
        .filter((payment: Payment) => PAYMENT_METHODS_SUPPORTED.includes(payment.id));

    return methods;
}