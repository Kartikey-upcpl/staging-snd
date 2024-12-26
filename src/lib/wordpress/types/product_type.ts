import type { Image } from "./image_type";

export type Product = {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: ProductDownload[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    backorders: string;
    low_stock_amount: string | null;
    sold_individually: boolean;
    weight: string;
    dimensions: ProductDimensions;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: ProductCategory[];
    tags: ProductTag[];
    images: Image[];
    attributes: ProductAttribute[],
    default_attributes: ProductDefaultAttribute[],
    variations: number[],
    grouped_products: number[],
    menu_order: number,
    price_html: string,
    related_ids: number[],
    meta_data: any[],
    stock_status: string,
    has_options: boolean,
    post_password: string,
};

export type ProductDownload = {
    id: string;
    name: string;
    file: string;
};

export type ProductDimensions = {
    length: string;
    width: string;
    height: string;
};

export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
};

export type ProductTag = {
    id: number;
    name: string;
    slug: string;
};

export type ProductAttribute = {
    id: number;
    name: string;
    slug: string,
    position: number,
    visible: boolean,
    variation: boolean,
    options: string[];
};

export type ProductDefaultAttribute = {
    id: number;
    name: string;
    option: string,
};

export const ProductTypeSimple = "simple";
export const ProductTypeVariable = "variable";
export const ProductTypeGrouped = "grouped";
export const ProductTypeExternal = "external";