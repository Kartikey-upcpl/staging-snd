import SearchTag from "@/components/search/SearchTag";

import { getTags } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export default function TagPage({ params }: { params: { slug: string[] } }) {
    const tagsPromise = getTags({});

    if (params.slug.length > 1) {
        return notFound()
    }

    return (
        <main className="page-wrapper-3 bg-light py-6">
            <SearchTag
                slug={params.slug[0]}
                tagsPromise={tagsPromise}
            />
        </main>
    )
}