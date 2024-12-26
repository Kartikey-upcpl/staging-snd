import React from "react";

import Link from "next/link";

import type { Product as ProductType, Tag } from "@/lib/typesense/typesense_type";

import { getPathFromUrl } from "@/utlis/url-utlis";

export default function AdditionalInfo({ product }: { product: ProductType }) {
    let catsComponent: React.ReactNode[] = [];

    for (let i = 0; i < product.categories.length; i++) {
        const cat = product.categories[i];
        catsComponent = [
            ...catsComponent,
            <Link key={cat.id} href={getPathFromUrl(cat.link)} className="hover:underline">{cat.name}</Link>
        ];

        if (i < product.categories.length - 1) {
            catsComponent = [
                ...catsComponent,
                " , ",
            ];
        }
    }

    const brands = product.extensions['brands'] ?? [];

    return (
        <div>
            <div className="mb-4">
                <label className="min-w-32 text-slate-500">SKU</label>
                <span>{product.sku}</span>
            </div>
            {brands.length > 0 && <div className="mb-4">
                <label className="min-w-32 text-slate-500">Brand</label>
                {brands.map((brand: { id: number, name: string, slug: string }) => <span key={brand.id}><Link href={`/brand/${brand.slug}`}>{brand.name}</Link></span>)}
            </div>}
            <div className="mb-4">
                <label className="min-w-32 text-slate-500">Categories</label>
                <span>
                    {catsComponent.map((cate) => cate)}
                </span>
            </div>
            {product.tags.length > 0 && (
                <div>
                    <label className="min-w-32 text-slate-500">Tags</label>
                    <span>{product.tags.flatMap((tag: Tag, index: number) => {
                        if (index < product.tags.length - 1) {
                            return [
                                <Link
                                    key={tag.id}
                                    href={`/product-tag/${tag.slug}`}
                                    className="hover:underline"
                                    dangerouslySetInnerHTML={{ __html: tag.name }}
                                />,
                                <span key={`seperator-${tag.slug}`}>{", "}</span>
                            ];
                        }
                        return [
                            <Link
                                key={tag.id}
                                href={`/product-tag/${tag.slug}`}
                                className="hover:underline"
                                dangerouslySetInnerHTML={{ __html: tag.name }}
                            />
                        ];
                    })}</span>
                </div>
            )}
        </div>
    );
}
