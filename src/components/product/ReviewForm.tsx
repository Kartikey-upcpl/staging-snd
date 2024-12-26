"use client";
import React, { useState, useCallback, useEffect, useTransition } from "react";

import { useFormState } from "react-dom";
import { useRouter, usePathname } from "next/navigation";

import { useCart } from "@/components/cart/cart-context";
import { addReview } from "./actions";
import type { Product as ProductType } from "@/lib/typesense/typesense_type";

import InputRating from "@/components/ui/InputRating";
import Loading from "@/components/ui/Loading";

export default function ReviewButtonForm({ product }: { product: ProductType }) {
    const [showForm, setShowForm] = useState(false);
    const classForm = showForm ? "border-1 p-4 mt-6" : "hidden border-1 p-4";

    const togleShowForn = useCallback(() => setShowForm(showForm => !showForm), [setShowForm]);

    return (
        <>
            <center>
                <button className="btn btn-primary flex items-center" onClick={togleShowForn}>
                    Write a review
                    {showForm ? (
                        <svg className="ml-3 w-3.5 fill-white" viewBox="0 0 448 512">
                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                        </svg>
                    ) : (
                        <svg className="ml-3 w-3.5 fill-white" viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
                        </svg>
                    )}

                </button>
            </center>
            <div className={classForm}>
                {showForm && (<ReviewForm product={product} />)}
            </div>
        </>
    );
}

function ReviewForm({ product }: { product: ProductType }) {
    const router = useRouter();
    const pathname = usePathname();

    const { user } = useCart();

    const [reviewer, setReviewer] = useState(user?.display_name ?? "");
    const [reviewerEmail, setReviewerEmail] = useState(user?.user_email ?? "");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);

    const [isPending, startTransition] = useTransition();
    const [state, action] = useFormState(addReview, undefined);

    useEffect(() => {
        if (!!state?.data?.id) {
            setReviewer(user?.display_name ?? "");
            setReviewerEmail(user?.user_email ?? "");
            setReview("");
            setRating(5);
            router.push(pathname + "?unapproved=" + state?.data?.id, { scroll: true });
        }
    }, [state, pathname, router, user]);

    const onSubmit = () => {
        startTransition(async () => {
            await action({
                product_id: product.id,
                review: review,
                reviewer: reviewer,
                reviewer_email: reviewerEmail,
                rating: rating,
            });
        });
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
            }}
        >
            <h5> {product.review_count > 0 ? "Leave feedback about this " : (
                <>
                    Be the first to review “<span dangerouslySetInnerHTML={{ __html: product.name }} />”
                </>
            )}</h5>
            <p>
                Your email address will not be published. *
            </p>
            <div className="select-star-rating">
                <label>Your rating</label>
                <InputRating value={rating} onChange={(r) => setRating(r)} />
            </div>
            <div className="mb-4">
                <textarea
                    className="form-control form-control_gray"
                    placeholder="Your Review"
                    cols={30}
                    rows={8}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                {!!state?.errors?.review && (
                    <p className="mt-1 text-red-500 text-xs">{state!.errors!.review}</p>
                )}
            </div>
            {!user?.ID && (
                <>
                    <div className="form-label-fixed mb-4">
                        <input
                            className="form-control form-control-md form-control_gray"
                            placeholder="Name *"
                            value={reviewer}
                            onChange={(e) => setReviewer(e.target.value)}
                        />
                        {!!state?.errors?.reviewer && (
                            <p className="mt-1 text-red-500 text-xs">{state!.errors!.reviewer}</p>
                        )}
                    </div>
                    <div className="form-label-fixed mb-4">
                        <input
                            className="form-control form-control-md form-control_gray"
                            placeholder="Email address *"
                            value={reviewerEmail}
                            onChange={(e) => setReviewerEmail(e.target.value)}
                        />
                        {!!state?.errors?.reviewer_email && (
                            <p className="mt-1 text-red-500 text-xs">{state!.errors!.reviewer_email}</p>
                        )}
                    </div>
                </>
            )}

            <div className="form-check mb-4">
                <input
                    className="form-check-input form-check-input_fill"
                    type="checkbox"
                    defaultValue=""
                />
                <label className="form-check-label">
                    Save my name, email, and website in this browser for the next time
                    I comment.
                </label>
            </div>
            <div className="form-action">
                {state?.message && (<p className="text-xs text-red-500 mt-1" dangerouslySetInnerHTML={{ __html: state.message }} />)}
                <button type="submit" className="btn btn-primary">
                    {isPending ? <Loading className="spinner-border-sm text-white" /> : "Submit"}
                </button>
            </div>
        </form>
    );
}

