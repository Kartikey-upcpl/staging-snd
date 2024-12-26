import { use } from "react";
import { getPostType } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Builder from "@/components/gutenberg/builder";

// Next.js will invalidate the cache when a
// request comes in, at most once every 1 hour.
export const revalidate = 3600;

export default function HomePage() {
    const post = use(getPostType('buy-premium-baby-kids-products-online-india-staranddaisy-2'));
    if (!post) return notFound();
    return (
        <Builder
            blocks={post.blocks}
            contentHtml={post?.content?.rendered ?? ''}
            flatsomeBlocks={post.flatsome_blocks}
        />
    );
}