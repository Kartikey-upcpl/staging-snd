import qs from 'qs';
import unescape from 'lodash/unescape';

import { typesenseClient } from '@/lib/typesense/http';
import { wcClient } from '@/lib/wordpress/http';

import { CATEGORY_COLLECTIONS } from '@/lib/constants';

import type { CategoryDocument } from '@/lib/typesense/types';
import type { TypesenseHit, TypesenseResponse } from '@/lib/typesense/types/typesense_type';
import type { Category, WcCategory } from '@/lib/wordpress/types';
import { ApiError, isTypesenseError, isWordpressError } from '@/lib/type-guards';

const reshapeCategory = (document: CategoryDocument): Category => {
    const reshapedCategory: Category = {
        count: document.count,
        description: document.description,
        id: document.rowID,
        image: document.image,
        name: unescape(document.name),
        parent: document.parent,
        permalink: document.permalink,
        review_count: document.review_count,
        slug: document.slug,
    };

    return reshapedCategory;
};

const reshapeCategories = (hits: TypesenseHit<CategoryDocument>[]): Category[] => {
    const reshapedCategories = [];

    for (const hit of hits) {
        if (hit) {
            const reshapedCategory = reshapeCategory(hit.document);

            if (reshapedCategory) {
                reshapedCategories.push(reshapedCategory);
            }
        }
    }

    return reshapedCategories;
};

/**
 * Get list category.
 * @returns A promise that resolves to the list category.
 */
export async function getCategories(query: { [key: string]: string | number }): Promise<Category[] | ApiError> {

    const params = qs.stringify({
        q: "*",
        query_by: "name",
        limit: 200,
        ...query,
    });

    const res = await typesenseClient<TypesenseResponse<CategoryDocument>>({
        cache: 'force-cache',
        pathname: `/collections/${CATEGORY_COLLECTIONS}/documents/search?${params}`,
        tags: ['categories'],
    });

    if (isTypesenseError(res)) {
        return {
            status: res.status,
            message: res.message,
        }
    }

    if (Array.isArray(res?.hits) && res.hits.length > 0) {
        return reshapeCategories(res.hits);
    }
    return [];
}

/**
 * Get single category by id.
 * 
 * @param id - The id of the category.
 * 
 * @returns A promise that resolves to the category.
 */
export async function getCategoryById(id: number): Promise<Category | null> {
    const res = await typesenseClient<CategoryDocument>({
        cache: 'no-cache',
        pathname: `/collections/${CATEGORY_COLLECTIONS}/documents/${id}`,
    });

    if (isTypesenseError(res)) {
        throw new Error(res.message);
    }

    if (res) {
        return reshapeCategory(res);
    }

    return null;
}

/**
 * Get wc category list 
 * 
 * @param query - The query of the category list.
 * 
 * @returns A promise that resolves to the category list.
 */
export async function getWcCategories(query?: {[key: string]: any}): Promise<WcCategory[] | ApiError> {
    console.log("test rest api -- - -- - -", query);
    const res = await wcClient({
        endpoint: "/wc/v3/products/categories",
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