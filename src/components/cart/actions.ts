'use server'

import { revalidateTag } from 'next/cache';
import {
    addToCart,
    removeItemCart,
    updateItemCart,
    applyCoupon as applyCouponApi,
    updateShipping,
    removeCoupon as removeCouponApi,
    updateCustomerCart
} from '@/lib/wordpress';

import { isApiError } from '@/lib/type-guards';
import { redirect } from 'next/navigation'

import { Cart } from '@/lib/wordpress/types';
import { TAGS } from '@/lib/constants';

import type { ApiError } from '@/lib/type-guards';
import type {
    AddToCartPayload,
    RemoveItemPayload,
    UpdateQuantityPayload,
    AddCouponPayload,
    RemoveCouponPayload,
    UpdateShippingMethodPayload,
    UpdateShippingPayload,
} from '@/lib/wordpress/types/cart_type';
import { cookies } from 'next/headers';

export type ActionResponse = {
    message?: string;
    cart?: Cart;
}

/**
 * Get the response from the API and return the correct response need to component.
 * 
 * @param res - The response from the API.
 * @returns  The ActionResponse to be sent to the component.
 */
function getActionResponse(res: Cart | ApiError): ActionResponse {
    if (isApiError(res)) {
        return {
            message: res.message
        }
    }
    // revalidateTag(TAGS.cart);
    return {
        cart: res,
    }
}

export async function removeItem(prevState: any, payload: RemoveItemPayload) {
    const res = await removeItemCart(payload);
    if (isApiError(res)) {
        return res.message;
    }
    revalidateTag(TAGS.cart);
    return '';
}

export async function updateItemQuantity(prevState: any, payload: UpdateQuantityPayload) {
    const res = await updateItemCart(payload);
    if (isApiError(res)) {
        return res.message;
    }
    revalidateTag(TAGS.cart);
    return '';
}

export async function applyCoupon(prevState: any, payload: AddCouponPayload) {
    const res = await applyCouponApi(payload);
    return getActionResponse(res);
}

export async function removeCoupon(prevState: any, payload: RemoveCouponPayload) {
    const res = await removeCouponApi(payload);
    if (isApiError(res)) {
        return {message: res.message, time: new Date().getTime()};
    }
    revalidateTag(TAGS.cart);
    return {message: "", time: new Date().getTime()};;
}

export async function addToCartAction(prevState: any, payload: AddToCartPayload) {
    const res = await addToCart(payload);
    return getActionResponse(res);
}

export async function selectShippingCart(prevState: any, payload: UpdateShippingMethodPayload) {
    const res = await updateShipping(payload);
    return getActionResponse(res);
}

export async function updateAddress(prevState: any, payload: UpdateShippingPayload) {
    const res = await updateCustomerCart({ 'shipping_address': payload.address, 'billing_address': payload.address });
    return getActionResponse(res);
}

export async function logoutAction() {
    cookies().delete('User-Token');
    revalidateTag(TAGS.cart);
    redirect('/login');
}

export async function revalidateTagCart() {
    revalidateTag(TAGS.cart);
}