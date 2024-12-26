// import Search from "@/components/instantsearch";
import { ApiError, isApiError } from "@/lib/type-guards";
import type { WpPostPagination } from '@/lib/wordpress/types';
import { getPostCategoryBySlug, getPostsWithPagination } from "@/lib/wordpress";
import { notFound, redirect } from "next/navigation";

import BlogList from "@/components/blog_list/BlogList";
import HeaderCategoryBlogPage from "@/components/blog_list/HeaderCategoryBlogPage";

export default async function CategoryPage({ params }: { params: { slug?: string[] } }) {
    const slug = params.slug || [];
    const pageIndex = slug.indexOf('page');
    const hasPagination = pageIndex !== -1;
    const pageNumber = hasPagination ? slug[pageIndex + 1] : null;
    const category = hasPagination ? slug[pageIndex - 1] : slug[slug.length - 1];

    // check value category is string or undefined (no have slug post category), if undefined return notFound
    if (!category) return notFound();

    // check hasPagination is true and pageNumber is null, if true return notFound
    if (hasPagination && !pageNumber) return notFound();

    // check hasPagination is true and pageIndex must is next last slug, if true return notFound
    if (hasPagination && pageIndex !== slug.length - 2) return notFound();
    
    // check pageNumber is not null and is number or not, if not null and not number false return notFound
    if (pageNumber && !/^\d+$/.test(pageNumber)) return notFound();

    const page = parseInt(pageNumber ?? "1") > 1 ? parseInt(pageNumber ?? "1"): 1;

    const pageName = hasPagination ? `/category/${slug.slice(0, pageIndex).join("/")}` : `/category/${slug.join("/")}`;

    // check hasPagination is true and value is 1, redirect no "/page/1" 
    if (hasPagination && page === 1) {
        return redirect(pageName);
    }

    const data = await getPostCategoryBySlug(category);

    if (isApiError(data)) throw new Error(data.message);
    if (!data) return notFound();
    
    const postsPromise: Promise<WpPostPagination | ApiError>= getPostsWithPagination({page: page, categories: data.id, status: "publish"}); 

    return (
        <BlogList
            postsPromise={postsPromise}
            pathNamePagination={pageName}
            header={<HeaderCategoryBlogPage category={data} />}
            page={page}
        />
    )
}