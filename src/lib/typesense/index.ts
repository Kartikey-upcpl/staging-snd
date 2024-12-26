import { isObject, isTypesenseError, type TypeSenseError } from '@/lib/type-guards';
import { ensureStartsWith } from '@/lib/utils';
import { PRODUCT_COLLECTIONS, PRODUCT_META_COLLECTIONS } from '@/lib/constants';
import qs from 'qs';
import type { Document, TypesenseResponse, Product as TypesenseProduct, Product } from './typesense_type';
import { typesenseClient } from './http';
import { WcProduct, WcProductDocument } from './types';

// TODO
// type TODOTYPE_META = any;

// type ResultError = { message: string, code: number };

// type ResponseType = [
//     Document | ResultError,
//     TODOTYPE_META | ResultError
// ];
// type Results = [
//     TypesenseResponse<Document> | ResultError,
//     TypesenseResponse<TODOTYPE_META> | ResultError
// ];

// function isError(error: unknown): boolean {
//     return isObject(error) &&
//         typeof (error as TypeSenseError)?.status === 'number' &&
//         typeof (error as TypeSenseError)?.message === 'string';
// }

// function reShapeResult([document, meta]: Results): ResponseType {
//     const resultDocument: Document | ResultError = isError(document) ? document : document.hits[0].document;
//     const resultMeta: TODOTYPE_META | ResultError  = isError(meta) ? meta : meta.hits[0].document;
//     return [
//         resultDocument,
//         resultMeta
//     ];
// }

export async function search({
    query
}: {
    query: Record<string, string | number | boolean>;
}): Promise<TypesenseResponse<Document> | TypeSenseError> {
    const queryString = qs.stringify(query);
    const urlWithParams = `/collections/${PRODUCT_COLLECTIONS}/documents/search?${queryString}`;

    const res = await typesenseClient<TypesenseResponse<Document>>({
        pathname: urlWithParams
    });

    return res;
}

export async function getProduct(documentId: string): Promise<Product | TypeSenseError> {
    const urlWithParams = `/collections/${PRODUCT_COLLECTIONS}/documents/${documentId}`;

    const res = await typesenseClient<Document | TypeSenseError>({
        pathname: urlWithParams,
        cache: "no-cache"
    });

    if (isTypesenseError(res)) {
        return res;
    }

    return {
        ...res,
        id: res.rowID
    };
}

export async function getProductMeta(documentId: string): Promise<WcProduct | TypeSenseError> {
    const urlWithParams = `/collections/${PRODUCT_META_COLLECTIONS}/documents/${documentId}`;

    const res = await typesenseClient<WcProductDocument | TypeSenseError>({
        pathname: urlWithParams,
        cache: "no-cache"
    });

    if (isTypesenseError(res)) {
        return res;
    }

    return {
        ...res,
        id: res.rowID
    }
}

// export async function getProductDetail(slug: string): Promise<ResponseType | TypeSenseError> {
//     const pathname = `/multi_search`;

//     const query = {
//         "searches": [
//             {
//                 "collection": PRODUCT_COLLECTIONS,
//                 "q": "*",
//                 "filter_by": `id:${slug}`
//             },
//             {
//                 "collection": PRODUCT_COLLECTIONS + "_meta",
//                 "q": "*",
//                 "filter_by": `slug:${slug}`
//             }
//         ]
//     }

//     const res = await typesenseClient<Results | TypeSenseError>({
//         pathname: pathname,
//         body: JSON.stringify(query),
//     });

//     if (isTypesenseError(res)) {
//         return res;
//     }

//     return reShapeResult(res);
// }

