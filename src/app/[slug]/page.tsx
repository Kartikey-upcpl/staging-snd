import { use } from "react";
import { getPostType } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Builder from "@/components/gutenberg/builder";
import PostContainer from "@/components/blog_list/PostContainer";

// Next.js will invalidate the cache when a
// request comes in, at most once every 1 hour.
export const revalidate = 3600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

const url = process.env.WORDPRESS_URL;
const ignore_pages = [
    'buy-premium-baby-kids-products-online-india-staranddaisy-2',
    'contact-us',
    'track-order',
    'about-us',
];

export async function generateStaticParams() {
    const posts: { post_name: string }[] = await fetch(`${url}/wp-json/app-builder/v1/post-type-slugs`).then((res) =>
        res.json()
    );
    return posts
        .filter((post) => !ignore_pages.includes(post.post_name))
        .map((post) => ({ slug: post.post_name }));
}

export default function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const post = use(getPostType(slug));
    if (!post) return notFound();
    if (post.type === "post") {
        return (
            <PostContainer post={post}>
                <Builder
                    blocks={post.blocks}
                    contentHtml={post?.content?.rendered ?? ''}
                    flatsomeBlocks={post.flatsome_blocks}
                />
            </PostContainer>
        )
    }
    return (
        <Builder
            blocks={post.blocks}
            contentHtml={post?.content?.rendered ?? ''}
            flatsomeBlocks={post.flatsome_blocks}
        />
    );
}