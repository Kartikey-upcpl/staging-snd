import React from "react";

import { PostCategory } from "@/lib/wordpress/types";
import { UxHtml } from "@/components/gutenberg/uxbuilder/ux_html";

export default function HeaderCategoryBlogPage({ category } : {category: PostCategory}) {
    return (
        <div className="mb-5">
            <UxHtml
                html={category.description}
                options={{}}
            />
        </div>
    )
}