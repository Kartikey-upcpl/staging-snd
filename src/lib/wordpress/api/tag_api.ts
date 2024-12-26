import qs from 'qs';
import unescape from 'lodash/unescape';

import { typesenseClient } from '@/lib/typesense/http';

import { TAG_COLLECTIONS } from '@/lib/constants';

import type { TagDocument } from '@/lib/typesense/types';
import type { TypesenseHit, TypesenseResponse } from '@/lib/typesense/types/typesense_type';
import type { Tag } from '@/lib/wordpress/types';
import { ApiError, isTypesenseError, TypeSenseError } from '@/lib/type-guards';

const reshapeTag = (document: TagDocument): Tag => {
    const reshapedTag: Tag = {
        count: document.count,
        description: document.description,
        id: document.rowID,
        name: unescape(document.name),
        parent: document.parent,
        slug: document.slug,
    };

    return reshapedTag;
};

const reshapeTags = (hits: TypesenseHit<TagDocument>[]): Tag[] => {
    const reshapedTags = [];

    for (const hit of hits) {
        if (hit) {
            const reshapedTag = reshapeTag(hit.document);

            if (reshapedTag) {
                reshapedTags.push(reshapedTag);
            }
        }
    }

    return reshapedTags;
};

/**
 * Get list tag.
 * @returns A promise that resolves to the list tag.
 */
export async function getTags(query: { [key: string]: string | number }): Promise<Tag[] | ApiError> {

    const params = qs.stringify({
        q: "*",
        query_by: "name",
        limit: 200,
        ...query,
    });

    const res = await typesenseClient<TypesenseResponse<TagDocument>>({
        cache: 'force-cache',
        pathname: `/collections/${TAG_COLLECTIONS}/documents/search?${params}`,
    });

    if (isTypesenseError(res)) {
        return {
            status: res.status,
            message: res.message,
        }
    }

    if (Array.isArray(res?.hits) && res.hits.length > 0) {
        return reshapeTags(res.hits);
    }
    return [];
}

/**
 * Get single tag by id.
 * 
 * @param id - The id of the tag.
 * 
 * @returns A promise that resolves to the tag.
 */
export async function getTagById(id: number): Promise<Tag | null> {
    const res = await typesenseClient<TagDocument>({
        cache: 'no-cache',
        pathname: `/collections/${TAG_COLLECTIONS}/documents/${id}`,
    });

    if (isTypesenseError(res)) {
        throw new Error(res.message);
    }

    if (res) {
        return reshapeTag(res);
    }

    return null;
}