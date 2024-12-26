import { Product } from "./product_type";

export type ProductVariationsItem = Omit<
        Product,
        'name' |
        'slug' |
        'type' |
        'featured' |
        'catalog_visibility' |
        'short_description' |
        'total_sales' |
        'external_url' |
        'button_text' |
        'sold_individually' |
        'shipping_required' |
        'shipping_taxable' |
        'reviews_allowed' |
        'average_rating' |
        'rating_count' |
        'upsell_ids' |
        'cross_sell_ids' |
        'parent_id' |
        'attributes' |
        'purchase_note' |
        'categories' |
        'tags' |
        'attributes' |
        'default_attributes' |
        'variations' |
        'grouped_products' |
        'related_ids' |
        'has_options' |
        'post_password'
    > & {
        attributes: {[key: string]: string}
    };

export type ProductVariations = {
    attribute_ids: {[key: string]: number};
    attribute_labels: {[key: string]: string};
    attribute_terms: {[key: string]: string[]};
    attribute_terms_labels: {[key: string]: string};
    attribute_terms_values: {[key: string]: {[key: string]: string}};
    variations: ProductVariationsItem[];
};