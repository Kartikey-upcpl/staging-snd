"use server";

import { getPosts, filterProducts, getWcCategories } from "@/lib/wordpress";
import { getElements, getElement } from "@/lib/wordpress/api/post_type_api";
import { Element as FlatsomeElement } from "@/lib/wordpress/types";
import { isWordpressError } from "@/lib/type-guards";


export async function getElementsAction(): Promise<{ [id: string]: FlatsomeElement } | undefined> {
    return getElements();
}

export async function getElementAction(id: string): Promise< FlatsomeElement | undefined> {
    return getElement(id);
}

export async function getProductsAction(query: { [key: string]: any }) {
    const response = await filterProducts(query);

    if (isWordpressError(response)) {
        return [];
    }

    return response;
}

export async function getProductCategoriesAction(query: { [key: string]: any }) {

    return await getWcCategories(query);
}

export async function getPostsAction(query: { [key: string]: any }) {

    return await getPosts(query);
}