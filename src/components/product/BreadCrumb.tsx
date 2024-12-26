import React from "react";

import { isValidUrl } from "@/lib/utils";
import BreadCrumb, { BreadCrumbType } from "@/components/ui/BreadCrumb";

import type { Category as CategoryType } from "@/lib/typesense/typesense_type";
import type { Category } from "@/lib/wordpress/types";
import { ApiError, isApiError } from "@/lib/type-guards";

export default function BreadCrumbProduct({ category, name, categories }: { category: CategoryType | undefined, name: string, categories: Category[] | ApiError }) {

    let itemBreadcumb: BreadCrumbType[] = [];

    if (!isValidUrl(category?.link)) {
        return null;
    }

    if (isApiError(categories)) return "Error!";

    const pathname = new URL(category!.link).pathname;
    const slugs = pathname.split("/");

    if (slugs.length > 1 && categories.length > 0) {

        for (const slug of slugs) {
            if (slug === "collections") {
                continue;
            }
            const cate: Category | undefined = categories.find((c) => c.slug === slug);
            if (!cate) {
                continue;
            }
            itemBreadcumb = itemBreadcumb.concat({
                name: cate.name,
                href: new URL(cate.permalink).pathname,
                isLink: true,
            });
        }
    }

    return (
        <BreadCrumb
            items={[
                {
                    name: "Home",
                    href: "/",
                    isLink: true,
                },
                ...itemBreadcumb,
                // {
                //     name: name,
                //     href: "#",
                //     isLink: false,
                // },
            ]}
        />
    );
}
