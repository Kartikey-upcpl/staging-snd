import { notFound } from 'next/navigation';

import Search from "@/components/search";
import { getCategories, getTags } from "@/lib/wordpress";

// import { isApiError } from '@/lib/type-guards';

// export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: { slug?: string[] } }) {
    // const slug = params.slug || [];
    // const pageIndex = slug.indexOf('page');
    // const hasPagination = pageIndex !== -1;
    // // const pageNumber = hasPagination ? slug[pageIndex + 1] : null;
    // const last_slug_category = hasPagination ? slug[pageIndex - 1] : slug[slug.length - 1];

    const categoriesPromise = getCategories({});
    const tagsPromise = getTags({});

    return (
        <main className="page-wrapper-3 bg-white py-6">
            <Search
                categoriesPromise={categoriesPromise}
                tagsPromise={tagsPromise}
            />
        </main>
    );
}