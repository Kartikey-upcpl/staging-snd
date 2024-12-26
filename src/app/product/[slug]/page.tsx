import { use } from "react";
import type { Metadata } from 'next';

import { getProduct, getProductMeta } from "@/lib/typesense";
import { getCategories, getProductById } from "@/lib/wordpress";

import Product from "@/components/product/Product";
import { isApiError, isTypesenseError } from '@/lib/type-guards';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // Slug is the document ID
    const product = await getProductMeta(params.slug);

    if (isTypesenseError(product)) return notFound();

    return product.yoast_head_json;
}

export default function ProductPage({ params }: PageProps) {
    // Slug is the document ID
    const product = use(getProduct(params.slug));

    // get list category
    const categories = use(getCategories({}));

    if (isTypesenseError(product) || isApiError(categories)) {
        return notFound();
    }

    // Slug is the document ID
    const wcProduct = use(getProductMeta(params.slug));

    if (isTypesenseError(wcProduct)) {
        return notFound();
    }

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: wcProduct.yoast_head_json['title'],
        description: wcProduct.yoast_head_json['description'],
        image: product.images[0].src,
    };

    return (
        <main className="page-wrapper-3 bg-light sm:flex sm:justify-center overflow-hidden max-w-full bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd)
                }}
            />
            <Product product={product} categories={categories} wcProduct={wcProduct} />
        </main>
    )
}