import SearchBrand from "@/components/search/SearchBrand";

import { getBrands } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export default function BrandPage({ params }: { params: { slug: string[] } }) {
    const brandsPromise = getBrands({});

    if (params.slug.length > 1) {
        return notFound()
    }

    return (
        <main className="page-wrapper-3 bg-light py-6">
            <SearchBrand
                slug={params.slug[0]}
                brandsPromise={brandsPromise}
            />
        </main>
    )
}