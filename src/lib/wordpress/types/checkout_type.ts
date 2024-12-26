import { Billing_Address, Shipping_Address } from "./customer_type";

export type PaymentDataItem = {
    key: string;
    value: string | boolean;
};

export type Extensions = {
    [key: string]: {
        [key: string]: any;
    };
};

export type CheckoutPayload = {
    billing_address: Billing_Address;
    shipping_address: Shipping_Address;
    customer_note?: string;
    payment_method: string;
    payment_data?: PaymentDataItem[];
    extensions?: Extensions;
    customer_password?: string;
    "prepaid-discount"?: string;
    "smart-cod-pro"?: string;
}

export interface CheckoutOrderPayload extends CheckoutPayload {
    key: string;
}

export type PaymentResult = {
    [key: string]: any;
}

export type CheckoutResponse = {
    order_id: number;
    status: string;
    order_key: string;
    customer_note: string;
    customer_id: number;
    billing_address: Billing_Address;
    shipping_address: Shipping_Address;
    payment_method: string;
    payment_result: PaymentResult;
};
