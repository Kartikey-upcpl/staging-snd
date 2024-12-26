"use client";
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Pagination from "@/components/ui/pagination";

export default function ReviewPaginationProduct({ pagination, visit }: { pagination: number, visit: number }) {
    const router = useRouter();

    const params = useParams();
    const searchParams = useSearchParams();

    const goPagination = (newVisit: number) => {
        const urlParams = new URLSearchParams(searchParams.toString())
        urlParams.set("review_page", `${newVisit}`);

        router.push(
            `/product/${params.slug}?${urlParams.toString()}`,
            {
                scroll: false
            }
        );
    }
    return (
        <Pagination
            pagination={pagination}
            currentVisit={visit}
            onChangePagination={goPagination}
        />
    );
}


