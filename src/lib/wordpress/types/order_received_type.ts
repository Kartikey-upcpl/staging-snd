export type OrderReceivedPayload = {
    order_id: number;
    key: string;
    billing_email?: string;
}

export type OrderReceivedAddress = {
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

export type OrderReceivedCouponTotals = {
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    total_discount: string;
    total_discount_tax: string;
};

export type OrderReceivedCoupon = {
    code: string;
    totals: OrderReceivedCouponTotals;
};

export type OrderReceivedQuantityLimits = {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
};

export type OrderReceivedImage = {
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
};

export type OrderReceivedPrices = {
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: string | null;
    raw_prices: {
        precision: number;
        price: string;
        regular_price: string;
        sale_price: string;
    };
};

export type OrderReceivedItemTotals = {
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
};

export type OrderReceivedItem = {
    key: string;
    id: number;
    quantity: number;
    quantity_limits: OrderReceivedQuantityLimits;
    name: string;
    short_description: string;
    description: string;
    sku: string;
    low_stock_remaining: number | null;
    backorders_allowed: boolean;
    show_backorder_badge: boolean;
    sold_individually: boolean;
    permalink: string;
    images: OrderReceivedImage[];
    variation: any[];
    prices: OrderReceivedPrices;
    item_data: any[];
    totals: OrderReceivedItemTotals;
    catalog_visibility: string;
};

export type OrderReceivedTotals = {
    subtotal: string;
    total_discount: string;
    total_shipping: string;
    total_fees: string;
    total_tax: string;
    total_refund: string;
    total_price: string;
    total_items: string;
    total_items_tax: string;
    total_fees_tax: string;
    total_discount_tax: string;
    total_shipping_tax: string;
    tax_lines: any[];
    currency_code: string,
    currency_symbol: string,
    currency_minor_unit: number,
    currency_decimal_separator: string,
    currency_thousand_separator: string,
    currency_prefix: string,
    currency_suffix: string
};

export type OrderReceivedResponse = {
    id: number;
    status: string;
    coupons: OrderReceivedCoupon[];
    shipping_address: OrderReceivedAddress;
    billing_address: OrderReceivedAddress;
    items: OrderReceivedItem[];
    needs_payment: boolean;
    needs_shipping: boolean;
    totals: OrderReceivedTotals;
    errors: any[];
    payment_requirements: string[];
};