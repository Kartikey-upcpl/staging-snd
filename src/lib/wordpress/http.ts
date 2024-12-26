import qs from 'qs';
import type { WordpressError } from "@/lib/type-guards";
import { getErrorMessage, getWordpressError, isWordpressError } from "@/lib/type-guards";
import { cookies } from 'next/headers';

const wordpressUrl = process.env?.WORDPRESS_URL ?? 'http://localhost:8108';
const wordpressConsumerKey = process.env?.WORDPRESS_CONSUMER_KEY ?? 'ck_xxxxxx';
const wordpressConsumerSecret = process.env?.WORDPRESS_CONSUMER_SECRET ?? 'cs_xxxxx';

function getCookie(key: string): string | undefined {
    return cookies().get(key)?.value;
}

export async function wordpressClient({
    cache = 'force-cache',
    method = 'GET',
    endpoint = '',
    query = {},
    headers,
    body,
    tags,
}: {
    cache?: RequestCache;
    method?: string;
    endpoint?: string;
    query?: { [key: string]: any };
    headers?: HeadersInit;
    body?: BodyInit;
    tags?: string[];
}): Promise<Response | WordpressError> {
    try {
        const queryParameters = qs.stringify(query);
        const url = new URL(`${wordpressUrl}/wp-json${endpoint}?${queryParameters}`);
        const res = await fetch(url, {
            method,
            headers,
            body,
            cache,
            ...(tags && { next: { tags } })
        });

        if (!res.ok) {
            return await getWordpressError(res);
        }

        return res;
    } catch (e) {
        return {
            code: 'unknown',
            message: getErrorMessage(e),
            data: {
                status: 500,
            }
        }
    }
}

export async function cartClient({
    endpoint = '',
    method = 'GET',
    query = {},
    headers,
    body,
    tags,
}: {
    endpoint: string;
    cache?: RequestCache;
    method?: string;
    query?: { [key: string]: any };
    headers?: HeadersInit;
    body?: BodyInit;
    tags?: string[];
}): Promise<Response | WordpressError> {
    const token = getCookie('User-Token');
    const res = await wordpressClient({
        endpoint: `/wc/store/v1${endpoint}`,
        'cache': 'no-cache',
        method,
        query: {
            ...query,
            ...(token && { 'app-builder-decode': true }),
        },
        headers: {
            'Content-Type': 'application/json',
            ...headers,
            ...(
                getCookie('Nonce') && getCookie('Cart-Token') && {
                    'Nonce': getCookie('Nonce'),
                    'Cart-Token': getCookie('Cart-Token'),
                }
            ),
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body,
        tags,
    });

    return res;
}

export async function wcClient({
    endpoint = '',
    method = 'GET',
    query = {},
    headers,
    body,
    tags,
    cache,
}: {
    endpoint: string;
    cache?: RequestCache;
    method?: string;
    query?: { [key: string]: any };
    headers?: HeadersInit;
    body?: BodyInit;
    tags?: string[];
}): Promise<Response | WordpressError> {
    const res = await wordpressClient({
        endpoint,
        method,
        query: {
            ...query,
            consumer_key: wordpressConsumerKey,
            consumer_secret: wordpressConsumerSecret,
        },
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body,
        tags,
        cache,
    });

    return res;
}