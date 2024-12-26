import { ApiError } from "@/lib/type-guards";
import { getPostsWithPagination } from "@/lib/wordpress";
import { WpPostPagination } from "@/lib/wordpress/types";

import { notFound, redirect } from "next/navigation";

import BlogList from "@/components/blog_list/BlogList";
import HeadingBlogPage from "@/components/blog_list/HeaderBlogPage";

export default async function BlogListPage({ params }: { params: { slug?: string[] } }) {
    const slugs = params.slug ?? [];

    const hasPagination = slugs[0] === "page";
    const pageNumber = hasPagination ? slugs[1] : null;

    // check have slugs and it not hasPagination, if true return notFound
    if (slugs.length > 1 && !hasPagination) return notFound();

    // check hasPagination is true and pageNumber is null, if true return notFound
    if (hasPagination && !pageNumber) return notFound();

    // check hasPagination is true and slugs with length > 2, if true return notFound
    if (hasPagination && slugs.length > 2) return notFound();
    
    // check pageNumber is not null and is number or not, if not null and not number false return notFound
    if (pageNumber && !/^\d+$/.test(pageNumber)) return notFound();

    const page = parseInt(pageNumber ?? "1") > 1 ? parseInt(pageNumber ?? "1"): 1;

    // check hasPagination is true and value is 1, redirect no "/page/1" 
    if (hasPagination && page === 1) {
        return redirect("/blog-baby-care-and-pregnancy-care");
    }

    const postsPromise: Promise<WpPostPagination | ApiError>= getPostsWithPagination({ page: page, status: "publish"}); 

    return (
        <BlogList
            postsPromise={postsPromise}
            pathNamePagination="/blog-baby-care-and-pregnancy-care"
            header={<HeadingBlogPage />}
            page={page}
        />
    );
}