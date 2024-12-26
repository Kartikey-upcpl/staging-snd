import qs from 'qs';
import unescape from 'lodash/unescape';

import { typesenseClient } from '@/lib/typesense/http';

import { BRAND_COLLECTIONS } from '@/lib/constants';

import type { BrandDocument } from '@/lib/typesense/types';
import type { TypesenseHit, TypesenseResponse } from '@/lib/typesense/types/typesense_type';
import type { Brand } from '@/lib/wordpress/types';
import { ApiError, isTypesenseError } from '@/lib/type-guards';

const reshapeBrand = (document: BrandDocument): Brand => {
    const reshapedBrand: Brand = {
        count: document.count,
        description: document.description,
        id: document.rowID,
        name: unescape(document.name),
        parent: document.parent,
        slug: document.slug,
    };

    return reshapedBrand;
};

const reshapeBrands = (hits: TypesenseHit<BrandDocument>[]): Brand[] => {
    const reshapedBrands = [];

    for (const hit of hits) {
        if (hit) {
            const reshapedBrand = reshapeBrand(hit.document);

            if (reshapedBrand) {
                reshapedBrands.push(reshapedBrand);
            }
        }
    }

    return reshapedBrands;
};

/**
 * Get list brand.
 * @returns A promise that resolves to the list brand.
 */
export async function getBrands(query: { [key: string]: string | number }): Promise<Brand[] | ApiError> {

    const params = qs.stringify({
        q: "*",
        query_by: "name",
        limit: 200,
        ...query,
    });

    const res = await typesenseClient<TypesenseResponse<BrandDocument>>({
        cache: 'force-cache',
        pathname: `/collections/${BRAND_COLLECTIONS}/documents/search?${params}`,
    });

    if (isTypesenseError(res)) {
        return {
            status: res.status,
            message: res.message,
        }
    }

    if (Array.isArray(res?.hits) && res.hits.length > 0) {
        return reshapeBrands(res.hits);
    }
    return [];
}

/**
 * Get single brand by id.
 * 
 * @param id - The id of the brand.
 * 
 * @returns A promise that resolves to the brand.
 */
export async function getBrandById(id: number): Promise<Brand | null> {
    const res = await typesenseClient<BrandDocument>({
        cache: 'no-cache',
        pathname: `/collections/${BRAND_COLLECTIONS}/documents/${id}`,
    });

    if (isTypesenseError(res)) {
        throw new Error(res.message);
    }

    if (res) {
        return reshapeBrand(res);
    }

    return null;
}