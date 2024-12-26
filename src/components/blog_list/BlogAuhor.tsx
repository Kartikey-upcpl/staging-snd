'use client';

import React, { use } from 'react';
import { isApiError } from "@/lib/type-guards";
import { WpUser } from "@/lib/wordpress/types";
import Link from 'next/link';

export default function BlogAuthor({ authorName, authorPromise } : { authorName: string, authorPromise: Promise<WpUser | undefined >}) {
    const data = use(authorPromise);

    console.log('test author -- - - -- - -- ', data);

    if (!!data && !isApiError(data)) {
        return (
            <Link className="hover:text-white" href="https://test.snd.in/author/seo_tanishabali/" dangerouslySetInnerHTML={{ __html: authorName }}/>
        );
    }
    return (
        <span>{authorName}</span>
    );
}