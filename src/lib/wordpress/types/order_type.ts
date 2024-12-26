export type Order = {
    id: number;
    parent_id: number;
    status: string;
    currency: string;
    version: string;
    prices_include_tax: boolean;
    date_created: string;
    date_modified: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    customer_id: number;
    order_key: string;
    billing: AddressOrder;
    shipping: AddressOrder;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    customer_ip_address: string;
    customer_user_agent: string;
    created_via: string;
    customer_note: string;
    date_completed: string | null;
    date_paid: string | null;
    cart_hash: string;
    number: string;
    meta_data: MetaDataOrder[];
    line_items: ItemOrder[];
    tax_lines: TaxLineOrder[],
    fee_lines: FeeLineOrder[],
    shipping_lines: ShippingLineOrder[],
    coupon_lines: CouponOrder[],
    refunds: RefundOrder[],
    payment_url: string,
    is_editable: boolean,
    needs_payment: boolean,
    needs_processing: boolean,
    date_created_gmt: string,
    date_modified_gmt: string,
    date_completed_gmt: string | null,
    date_paid_gmt: string | null,
    currency_symbol: string,
    store_credit_used?: number
};

export type AddressOrder = {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone?: string;
    email?: string;
};

export type MetaDataOrder = {
    id: number;
    key: string;
    value: string;
    display_key?: string;
    display_value?: string;
};

export type ImageOrder = {
    id: string;
    src: string;
};

export type TaxLineOrder = {
    id: number;
    rate_code?: string;
    rate_id?: number;
    label?: string;
    compound?: boolean;
    tax_total?: string;
    rate_percent?: number,
    shipping_tax_total?: string;
    total?: string;
    subtotal?: string;
    meta_data?: MetaDataOrder[];
}

export type ItemOrder = {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: TaxLineOrder[];
    sku: string;
    price: number;
    image?: ImageOrder;
    meta_data: MetaDataOrder[];
    parent_name: string | null;
};

export type ShippingLineOrder = {
    id: number;
    method_title: string;
    method_id: string;
    instance_id: string;
    total: string;
    total_tax: string;
    taxes: TaxLineOrder[];
    meta_data: MetaDataOrder[];
}

export type FeeLineOrder = {
    id: number;
    name: string;
    tax_class: string;
    tax_status: string;
    total: string;
    total_tax: string;
    taxes: TaxLineOrder[];
    meta_data: MetaDataOrder[];
}

export type CouponOrder = {
    id: number;
    code: string;
    discount: string;
    discount_tax: string;
    meta_data: MetaDataOrder[];
    discount_type?: string;
    nominal_amount?: number;
    free_shipping?: boolean;
}

export type RefundOrder = {
    id: number;
    reason: string;
    total: string;
}