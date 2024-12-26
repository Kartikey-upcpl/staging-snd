// import { isShopifyError } from '@/lib/type-guards';

import { TypeSenseError, getTypeSenseError, getErrorMessage } from "@/lib/type-guards";

const host = process.env?.TYPESENSE_HOST || 'search';
const port = process.env?.TYPESENSE_PORT || 8108;
const protocol = process.env?.TYPESENSE_PROTOCOL || 'http'
const apiKey = process.env?.TYPESENSE_API_KEY || 'NZe35EouSJs3Dp5yeuC83pMPi8UaP8YM';

/**
 * The Typesense client.
 * 
 * @param cache The cache mode of the request. Default is 'force-cache'. 
 * @param headers The headers of the request.
 * @param pathname The pathname of the request.
 * 
 * @returns The response of the request.
 */
export async function typesenseClient<T>({
    cache = 'force-cache',
    headers,
    pathname,
    tags,
    method = 'GET',
    body,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    pathname: string;
    tags?: string[];
    method?: string;
    body?: BodyInit
}): Promise<T | TypeSenseError> {
    try {
        const url = new URL(`${protocol}://${host}:${port}${pathname}`);
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-TYPESENSE-API-KEY': apiKey,
                ...headers
            },
            body,
            cache,
            ...(tags && { next: { tags } })
        });

        // If the response is not OK, throw an error
        if (!res.ok) {
            return await getTypeSenseError(res);
        }

        return await res.json();
    } catch (e) {
        return {
            status: 500,
            message: getErrorMessage(e),
            pathname
        };
    }
}