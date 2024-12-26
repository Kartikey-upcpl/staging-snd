import { wcClient, wordpressClient } from '@/lib/wordpress/http';

import type { Product, ProductVariations } from '@/lib/wordpress/types';
import type { Document, Product as ProductDoc } from '@/lib/typesense/typesense_type';
import { ApiError, isWordpressError, WordpressError } from '@/lib/type-guards';

const reshapeProduct = (document: ProductDoc): Document => {
    const reshapedProduct: Document = {
        id: document.slug,
        rowID: document.id,
        name: document.name,
        slug: document.slug,
        parent: document.parent,
        type: document.type,
        variation: document.variation,
        permalink: document.permalink,
        short_description: document.short_description,
        description: document.description,
        on_sale: document.on_sale,
        sku: document.sku,
        prices: document.prices,
        price_html: document.price_html,
        average_rating: document.average_rating,
        review_count: document.review_count,
        images: document.images,
        categories: document.categories,
        tags: document.tags,
        attributes: document.attributes,
        variations: document.variations,
        has_options: document.has_options,
        is_purchasable: document.is_purchasable,
        is_in_stock: document.is_in_stock,
        is_on_backorder: document.is_on_backorder,
        low_stock_remaining: document.low_stock_remaining,
        sold_individually: document.sold_individually,
        add_to_cart: document.add_to_cart,
        extensions: document.extensions,
    };

    return reshapedProduct;
};

/**
 * Get product list.
 * 
 * @param query - The query of the product list.
 * 
 * @returns A promise that resolves to the product list.
 */
export async function getProducts(query: {[key: string]: any}): Promise<Product[]> {
    const res: Response | WordpressError = await wcClient({
        endpoint: "/wc/v3/products",
        method: 'GET',
        query: query,
    });

    if (isWordpressError(res)) {
        return [];
    }

    return await res.json();
}

/**
 * Get single product by id.
 * 
 * @param id - The id of the product.
 * @param query - The query of the product.
 * 
 * @returns A promise that resolves to the product.
 */
export async function getProductById(id: number, query?: {[key: string]: any}): Promise<Product | ApiError> {
    const res = await wcClient({
        endpoint: `/wc/v3/products/${id}`,
        method: 'GET',
        cache: 'no-cache',
        query: query,
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        }
    }

    return await res.json();
}

/**
 * Get product variation.
 * 
 * @param query - The query of the product.
 * 
 * @returns A promise that resolves to the product variations.
 */
export async function getProductVariations(query: {[key: string]: any}): Promise<ProductVariations | ApiError> {
    const res = await wcClient({
        endpoint: `/app-builder/v1/product-variations`,
        method: 'GET',
        query: query,
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

/**
 * Filter products
 * 
 * @param query - The query of the product list.
 * 
 * @returns A promise that resolves to the product list.
 */
export async function filterProducts(query: {[key: string]: any}): Promise<Document[]> {
    const res: Response | WordpressError = await wordpressClient({
        endpoint: "/wc/store/v1/products",
        method: 'GET',
        query: query,
    });

    if (isWordpressError(res)) {
        return [];
    }

    const data: ProductDoc[] = await res.json();

    const reshapedProducts: Document[] = [];

    for (const item of data) {
        if (item) {
            const reshapedProduct = reshapeProduct(item);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
}