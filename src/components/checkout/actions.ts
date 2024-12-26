'use server'

import { updateCustomer, selectShippingRate, checkout, getOrderReceived, checkoutOrder } from '@/lib/wordpress';
import { ApiResponse, getApiResponse, isApiError, isWordpressError } from '@/lib/type-guards';
import type {
  UpdateCustomerAddressPayload,
  Cart,
  SelectShippingRatePayload,
  CheckoutResponse, CheckoutPayload, OrderReceivedResponse, OrderReceivedPayload, CheckoutOrderPayload
} from '@/lib/wordpress/types';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { wcClient } from '@/lib/wordpress/http';

/**
 * Update customer.
 * 
 * @param {ApiResponse<Cart>} prevState - The previous state.
 * @param {UpdateCustomerAddressPayload} formData - The customer address to update.
 * @returns {Promise<ApiResponse<Cart>>} A promise that resolves to the cart.
 */
export async function updateCustomerAction(prevState: ApiResponse<Cart>, formData: UpdateCustomerAddressPayload): Promise<ApiResponse<Cart>> {
  const res = await updateCustomer(formData);
  revalidateTag(TAGS.cart);
  return getApiResponse<Cart>(res);
}

/**
 * Select shipping method.
 * 
 * @param {ApiResponse<Cart>} prevState - The previous state.
 * @param {SelectShippingRatePayload} formData - The package and rate to select.
 * 
 * @returns {Promise<ApiResponse<Cart>>} A promise that resolves to the cart.
 */
export async function selectShippingMethod(prevState: ApiResponse<Cart>, formData: SelectShippingRatePayload): Promise<ApiResponse<Cart>> {
  const res = await selectShippingRate(formData);
  revalidateTag(TAGS.cart);
  return getApiResponse<Cart>(res);
}

/**
 * Checkout
 * 
 * @param {ApiResponse<CheckoutResponse>} prevState - The previous state.
 * @param {CheckoutPayload} formData - The package and rate to select.
 * 
 * @returns {Promise<ApiResponse<CheckoutResponse>>} A promise that resolves to the checkout.
 */
export async function checkoutAction(prevState: ApiResponse<CheckoutResponse>, formData: CheckoutPayload): Promise<ApiResponse<CheckoutResponse>> {
  const res = await checkout(formData);
  if (isApiError(res)) {
    return getApiResponse<CheckoutResponse>(res);
  }

  if (res.status === 'pending') {
    return {
      data: res,
    };
  }

  revalidateTag(TAGS.cart);
  redirect('/checkout/order-received/' + res.order_id + '?key=' + res.order_key + '&email=' + encodeURIComponent(res?.billing_address?.email ?? ''));
}

/**
 * Checkout Order
 * 
 * @param {number} id - The order id.
 * @param {CheckoutPayload} formData - The package and rate to select.
 * 
 * @returns {Promise<ApiResponse<string>>} A promise that resolves to the checkout.
 */
export async function checkoutOrderAction(id: number, formData: CheckoutOrderPayload): Promise<ApiResponse<string>> {
  const res = await checkoutOrder({
    id,
    payload: formData
  });
  return getApiResponse<string>(res);
}

/**
 * Get Order Received Action
 * 
 * @param {ApiResponse<OrderReceivedResponse>} prevState - The previous state.
 * @param {OrderReceivedPayload} formData - The package and rate to select.
 * 
 * @returns {Promise<ApiResponse<OrderReceivedResponse>>} A promise that resolves to the checkout.
 */
export async function getOrderReceivedAction(prevState: ApiResponse<OrderReceivedResponse>, formData: OrderReceivedPayload): Promise<ApiResponse<OrderReceivedResponse>> {
  const res = await getOrderReceived(formData);
  return getApiResponse<OrderReceivedResponse>(res);
}

/**
 * Checkout Order
 * 
 * @param {number} id - The order id.
 * @param {CheckoutPayload} formData - The package and rate to select.
 * 
 * @returns {Promise<ApiResponse<string>>} A promise that resolves to the checkout.
 */
export async function goKwikCheckoutOrderAction() {
  const res = await wcClient({
    endpoint: "/wc/v3/snd-gokwik",
  });
  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    }
  }
  return await res.json();
}


export async function getOrderById(id: number) {
  const res = await wcClient({
    endpoint: `/wc/v3/orders/${id}`,
    method: 'GET',
  });
  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    }
  }
  return await res.json();
}

export async function getRelatedProductById(id: number) {
  const res = await wcClient({
    endpoint: `/wc/v3/products/${id}`,
    method: 'GET',
    cache: 'no-cache',
  });

  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    }
  }

  return await res.json();
}

export async function getWalletBalance(
  userId: string
) {
  const res = await wcClient({
    endpoint: `/wc/v2/wallet/balance/${userId}`,
    method: "GET", // Use GET method
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log("respppp", res);

  // Handle WordPress error if any
  if (isWordpressError(res)) {
    return {
      message: res.message,
      status: res.data.status,
    }
  }
  // Parse and return the successful response as an array of PincodeCheckerResponse
  return await res.json();
}

export async function getWalletTransacttions(
  email: string
) {
  let query = {
    email: email
  }
  const res = await wcClient({
    endpoint: "/wc/v3/wallet",
    method: "GET", // Use GET method
    headers: {
      "Content-Type": "application/json",
    },
    query: query
  });

  // console.log("respppp", res);

  // Handle WordPress error if any
  if (isWordpressError(res)) {
    return {
      message: res.message,
      status: res.data.status,
    }
  }
  // Parse and return the successful response as an array of PincodeCheckerResponse
  return await res.json();
}

export async function getUserById(userId: string) {
  const res = await wcClient({
    endpoint: `/wc/v3/customers/${userId}`,
    method: 'GET',
  });
  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    }
  }
  return await res.json();
}


export async function updateUser(userId: string, updatedData: Record<string, any>) {
  console.log("userId", userId,)
  console.log("updatedData", updatedData)

  const res = await wcClient({
    endpoint: `/wc/v3/customers/${userId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData), // Pass updated data in the request body
  });
  console.log("res", res)


  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    };
  }

  return await res.json();
}

export async function getTaggedProductById(currentPage: number) {
  const res = await wcClient({
    endpoint: "/wc/v3/products",
    method: 'GET',
    cache: 'no-cache',
    query: { // Added query parameters in the 'query' object
      tag: 1122,
      page: currentPage,
      per_page: 10,
    }
  });

  if (isWordpressError(res)) {
    return {
      status: res.data.status,
      message: res.message,
    }
  }

  return await res.json();
}