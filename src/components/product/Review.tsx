"use client"

import React, { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";
import { getReviews } from "./actions";
import { ReviewCommentType } from "@/lib/wordpress/types";
import type { Product as ProductType } from "@/lib/typesense/typesense_type";

import { IntStarRating } from "@/components/ui/InputRating";
import Image from "@/components/image/Image";
import Loading from "@/components/ui/Loading";

import ReviewButtonForm from "./ReviewForm";
import ReviewPaginationProduct from "./ReviewPagination";
import { ApiError, isApiError } from "@/lib/type-guards";

const perPage = 10;

export default function Review({ product }: { product: ProductType }) {
    const searchParams = useSearchParams();
    const [data, setData] = useState<ReviewCommentType[] | ApiError>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const review_count: number= useMemo(() => {
        let count = 1;
        if (searchParams.has("review_page")) {
            const valueCount: number = parseInt(searchParams.get("review_page") ?? "1");
            if (!isNaN(valueCount) && valueCount > 1) {
                count = valueCount;
            }
        }
        return count
    }, [searchParams]);
    
    const unapproved: number | undefined= useMemo(() => {
        if (searchParams.has("unapproved")) {
            const id: number = parseInt(searchParams.get("unapproved") ?? "");
            if (!isNaN(id)) {
                return id;
            }
        }
        return undefined
    }, [searchParams]);

    const pagination = useMemo(() => Math.ceil(product.review_count / perPage), [product.review_count]);

    const page = useMemo(() => review_count <= pagination ? review_count : 1, [review_count, pagination]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            var reviews: ReviewCommentType[] | ApiError= [];

            if (unapproved) {
                reviews = await getReviews({
                    include: unapproved,
                    product: product.id,
                    status: "hold",
                });
            } else {
                if (product.review_count > 0) {
                    reviews = await getReviews({
                        per_page: perPage,
                        page: page,
                        product: product.id,
                        status: "approved"
                    });
                }
            }

            setData(reviews);
            setLoading(false);
        }
        fetchData();
    }, [unapproved, page, product]);

    return (
        <>
            <h2 className="product-single__reviews-title">Reviews</h2>
            {isApiError(data) ? (
                <center>
                    <p className="text-center text-red-500">{data.message}</p>
                </center>
            ) : (
                <>
                    {loading ? (
                        <center className="mb-6">
                            <Loading />
                        </center>
                    ) :
                        data.length > 0 ? (
                            <>
                                <div className="product-single__reviews-list">
                                    {data.map((comment: ReviewCommentType, i) => (
                                        <div key={i} className="product-single__reviews-item">
                                            <div className="customer-avatar">
                                                <Image src={comment.reviewer_avatar_urls["48"]} alt="image" width={80} height={80} />
                                            </div>
                                            <div className="customer-review grow">
                                                {comment.status === "hold" ? (
                                                    <div className="customer-name">
                                                        <i>Your review is awaiting approval</i>  
                                                    </div>
                                                ): (
                                                    <>
                                                        <div className="customer-name">
                                                            <h6>{comment.reviewer}</h6>
                                                            <IntStarRating value={comment.rating} />
                                                        </div>
                                                        <div className="review-date">{comment.date_created}</div>
                                                    </>
                                                )}
                                                
                                                <div className="review-text" dangerouslySetInnerHTML={{ __html: comment.review }} />
                                                {!!comment?.reviews_images && comment.reviews_images.length > 0 && (
                                                    <div className="mb-6 flex flex-wrap gap-2">
                                                        {comment.reviews_images.map((image, index) => {
                                                            return (
                                                                <Image
                                                                    key={index}
                                                                    src={image.thumb} alt="review image" width={56} height={56}
                                                                    className="w-14 h-14 border-1 object-contain rounded-lg"
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {pagination > 1 && (
                                    <center className="mb-9">
                                        <ReviewPaginationProduct pagination={pagination} visit={page} />
                                    </center>
                                )}
                            </>
                        ) : (
                            <center className="mb-10"><span>There are no reviews yet.</span></center>
                        )}
                    <div className="product-single__review-form">
                        <ReviewButtonForm product={product} />
                    </div>
                </>
            )}
        </>
    );
}


