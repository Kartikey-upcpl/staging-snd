import { ApiError, isTypesenseError, isWordpressError } from '@/lib/type-guards';
import type { WpPage, WpPost, WpPostPagination } from '@/lib/wordpress/types/post_type';
import type { Element } from "@/lib/wordpress/types/flatsome_block_type";
import type { WpPostTypeDocument } from '@/lib/wordpress/typesense_type';
import { typesenseClient } from '@/lib/typesense/http';

import { PAGE_COLLECTIONS, POST_COLLECTIONS } from '@/lib/constants';
import { wordpressClient } from '@/lib/wordpress/http';

/**
 * Retrieves a WordPress posts.
 * @param query - The query of the posts.
 * @returns A promise that resolves to the retrieved posts
 */
export async function getPosts(query?: { [key: string]: any }): Promise<WpPost[]> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/posts',
        query: query,
    });

    if (isWordpressError(res)) {
        return [];
    }

    return await res.json();
}

/**
 * Retrieves a WordPress posts pagination.
 * @param query - The query of the posts.
 * @returns A promise that resolves to the retrieved posts
 */
export async function getPostsWithPagination(query?: { [key: string]: any }): Promise<WpPostPagination | ApiError> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/posts',
        query: query,
        cache: 'no-cache',
    });

    if (isWordpressError(res)) {
        return {
            status: res.data.status,
            message: res.message,
        };
    }

    const data: WpPost[] = await res.json();
    const totalItem = Number(res.headers.get("X-Wp-Total"));
    const totalPage = Number(res.headers.get("X-Wp-Totalpages"));

    return {
        totalItem: totalItem,
        totalPage: totalPage,
        data: data,
    };
}

/**
 * Retrieves a WordPress post by its slug.
 * @param slug - The slug of the post.
 * @returns A promise that resolves to the retrieved post, or undefined if the post is not found.
 */
export async function getPost(slug: string): Promise<WpPostTypeDocument | undefined> {
    const pathname = `/collections/${POST_COLLECTIONS}/documents/${slug}`;
    const res = await typesenseClient<WpPostTypeDocument>({
        pathname
    });

    if (isTypesenseError(res)) {
        return undefined;
    }

    return res;
}

/**
 * Retrieves a WordPress post by its slug.
 * @param slug - The slug of the post to retrieve.
 * @returns A promise that resolves to a `WpPost` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function getWpPost(slug: string): Promise<WpPost | undefined> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/posts',
        query: {
            slug: slug
        },
        cache: 'no-cache',
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    const data: WpPost[] = await res.json();

    return data.length === 1 ? {
        ...data[0],
        type: 'post',
    } : undefined;
}

/**
 * Retrieves a WordPress page by its slug.
 * @param slug - The slug of the page to retrieve.
 * @returns A promise that resolves to a `WpPostTypeDocument` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function getPage(slug: string): Promise<WpPostTypeDocument | undefined> {
    const pathname = `/collections/${PAGE_COLLECTIONS}/documents/${slug}`;
    const res = await typesenseClient<WpPostTypeDocument>({
        pathname
    });
    if (isTypesenseError(res)) {
        return undefined;
    }

    return res;
}

/**
 * Retrieves a WordPress page by its slug.
 * @param slug - The slug of the page to retrieve.
 * @returns A promise that resolves to a `WpPage` object representing the retrieved page, or `undefined` if the page is not found.
 */
export async function getWpPage(slug: string): Promise<WpPage | undefined> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/pages',
        query: {
            slug: slug,
            _fields: 'id,slug,flatsome_blocks'
        },
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    const data: WpPage[] = await res.json();

    return data.length === 1 ? {
        ...data[0],
        type: 'page',
    } : undefined;
}

/**
 * Retrieves a WordPress post or page by its slug.
 * 
 * @param slug - The slug of the post or page.
 * @returns A promise that resolves to a `WpPost`, `WpPage`, or `undefined`.
 */
export async function getPostType(slug: string): Promise<WpPost | WpPage | undefined> {
    const wpPage = await getWpPage(slug);
    if (wpPage) {
        return wpPage;
    }

    const wpPost = await getWpPost(slug);
    if (wpPost) {
        return wpPost;
    }

    return undefined;
}

/**
 * Retrieves a list of elements.
 * 
 * @returns A promise that resolves to a dictionary of elements.
 */
export async function getElements(): Promise<{ [id: string]: Element } | undefined> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/ux-blocks',
        query: { per_page: 100 },
        tags: ['elements'],
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    const blocks = await res.json();
    let elements: { [id: string]: Element } = {};
    blocks.forEach((block: { slug: string, flatsome_blocks: Element }) => {
        const { slug, flatsome_blocks } = block;
        if (slug && flatsome_blocks) {
            elements[slug] = flatsome_blocks;
        }
    });

    return elements;
}

/**
 * Retrieves a list of elements.
 * 
 * @returns A promise that resolves to a dictionary of elements.
 */
export async function getElement(slug: string): Promise<Element | undefined> {
    const res = await wordpressClient({
        endpoint: '/wp/v2/ux-blocks',
        query: { slug },
        tags: ['element', 'block-' + slug],
    });

    if (isWordpressError(res)) {
        return undefined;
    }

    const blocks = await res.json();

    if (blocks.length === 0) {
        return undefined;
    }

    return blocks[0]?.flatsome_blocks;
}