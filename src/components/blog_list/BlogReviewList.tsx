"use client";
import React, { useEffect, useState } from "react";

import type {
    ReviewPostType,
} from "@/lib/wordpress/types";
import { isApiError } from "@/lib/type-guards";

import { getReviews } from "./actions";

import Pagination from "@/components/ui/pagination";
import Loading from "@/components/ui/Loading";
import ReviewItem, { ShimmerReviewItem } from "./ReviewItem";

interface PropsType {
    postId: number;
    parentId?: number;
    idSeleted: number;
    onIdSelected: (value: number) => void;
    lvl?: number;
    type?: "pagination" | "loadmore";
}

export default function BlogReviewList({
    postId,
    parentId = 0,
    idSeleted,
    onIdSelected,
    lvl = 0,
    type = "pagination",
}: PropsType) {
    const [data, setData] = useState<ReviewPostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
    
                if (type === "pagination" && data.length > 0) {
                    setData([]);
                }
    
                const res = await getReviews({
                    post: postId,
                    parent: parentId,
                    page: currentPage,
                });
    
                if (isApiError(res)) {
                    setTotalPages(0);
                } else {
                    if (type === "pagination") {
                        setData(res.data);
                    } else {
                        setData([...data, ...res.data]);
                    }
    
                    if (res.totalPage !== totalPages) {
                        setTotalPages(res.totalPage);
                    }
                }
    
                setLoading(false);
            } catch (_) {
                setLoading(false);
                setTotalPages(0);
            }
        }
        fetchData();
    }, [parentId, postId, currentPage]);

    const dataShimmer = Array.from({ length: 5 });

    const shimmer = dataShimmer.map((_, i) => <ShimmerReviewItem key={i}/>);

    switch (type) {
        case "loadmore":
            return (
                <>
                    {loading && data.length < 1 ? shimmer : (
                        data.map((review) => (
                            <ReviewItem
                                key={review.id}
                                item={review}
                                idSeleted={idSeleted}
                                onIdSelected={onIdSelected}
                                lvl={lvl}
                            />
                        ))
                    )}

                    {currentPage < totalPages && (
                        <div className="d-flex justify-content-center my-3">
                            <button
                                className="text-pink-600 fw-semibold"
                                onClick={() => !loading ? setCurrentPage(currentPage + 1) : undefined}
                            >
                                Load more{" "}
                                {loading && (
                                    <Loading className="spinner-border-sm ml-2" />
                                )}
                            </button>
                        </div>
                    )}
                </>
            );
        default:
            return (
                <>
                    {loading && data.length < 1 ? shimmer : (
                        data.map((review) => (
                            <ReviewItem
                                key={review.id}
                                item={review}
                                idSeleted={idSeleted}
                                onIdSelected={onIdSelected}
                            />
                        ))
                    )}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                pagination={totalPages}
                                currentVisit={currentPage}
                                onChangePagination={setCurrentPage}
                            />
                        </div>
                    )}
                </>
            );
    }
}
