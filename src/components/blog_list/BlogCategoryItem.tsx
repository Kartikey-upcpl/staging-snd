'use client';

import React, { use } from 'react';
import { ApiError, isApiError } from "@/lib/type-guards";
import { PostCategory, WpPostCategory } from "@/lib/wordpress/types";
import Link from 'next/link';
import { formatLink } from '@/utlis/format-link';

export default function BlocCategoryItem({ category, categoryPromise } : { category: WpPostCategory, categoryPromise: Promise<PostCategory | undefined | ApiError >}) {
    const data = use(categoryPromise);

    let href = `/category/${category.slug}`;

    if (!!data && !isApiError(data)) {
        href = formatLink(data.link);
    }
    return (
        <Link href={href} rel="category tag" className="text-white hover:text-white" dangerouslySetInnerHTML={{ __html: category.name}} />
    );
}