import { Image } from "./image_type";

export type Cart = {
    items: Item[];
    coupons: any[];
    fees: any[];
    totals: Totals;
    shipping_address: Address;
    billing_address: Address;
    needs_payment: boolean;
    needs_shipping: boolean;
    payment_requirements: string[];
    has_calculated_shipping: boolean;
    shipping_rates: ShippingRate[];
    items_count: number;
    items_weight: number;
    cross_sells: any[];
    errors: any[];
    payment_methods: string[];
    extensions: any;
};

export type Item = {
    key: string;
    id: number;
    type: string;
    quantity: number;
    quantity_limits: QuantityLimits;
    name: string;
    short_description: string;
    description: string;
    sku: string;
    low_stock_remaining: any;
    backorders_allowed: boolean;
    show_backorder_badge: boolean;
    sold_individually: boolean;
    permalink: string;
    images: Image[];
    variation: VariationItemCart[];
    item_data: ItemData[];
    prices: Prices;
    totals: ItemTotals;
    catalog_visibility: string;
    extensions: any;
    loading?: boolean;
};

export type QuantityLimits = {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
};

export type VariationItemCart = {
    attribute: string;
    value: string;
};

export type ItemData = {
    key: string;
    value: string;
    display: string;
};

export type Prices = {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: any;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: RawPrices;
};

export type RawPrices = {
    precision: number;
    price: string;
    regular_price: string;
    sale_price: string;
};

export type ItemTotals = {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

export type Totals = {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_price: string;
    total_tax: string;
    tax_lines: TaxLine[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

export type TaxLine = {
    name: string;
    price: string;
    rate: string;
};

export type Address = {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
    email?: string;
};

export type ShippingRate = {
    package_id: number;
    name: string;
    destination: Address;
    items: ShippingItem[];
    shipping_rates: ShippingMethod[];
};

export type ShippingItem = {
    key: string;
    name: string;
    quantity: number;
};

export type ShippingMethod = {
    rate_id: string;
    name: string;
    description: string;
    delivery_time: string;
    price: string;
    taxes: string;
    instance_id: number;
    method_id: string;
    meta_data: MetaData[];
    selected: boolean;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

export type MetaData = {
    key: string;
    value: string;
};


/**
 * The payload for the removeItem, updateQuantity, addCoupon, removeCoupon, and addToCart actions.
 */

export type AddCouponPayload = {
    code: string;
};

export type RemoveCouponPayload = {
    code: string;
};

export type RemoveItemPayload = {
    key: string;
};

export type UpdateQuantityPayload = {
    key: string;
    quantity: number;
};

export type UpdateShippingMethodPayload = {
    packageId: number;
    rateId: string;
};

export type UpdateShippingPayload = {
    packageId: number;
    address: Address;
};

export type AddToCartVariation = {
    attribute: string;
    value: string;
};

/**
 * The payload for the addCoupon action.
 * 
 * @property {number} id The product ID.
 * @property {number} quantity The quantity of the product.
 */
export type AddToCartPayload = {
    id: number;
    quantity: number;
    variation?: AddToCartVariation[];
};