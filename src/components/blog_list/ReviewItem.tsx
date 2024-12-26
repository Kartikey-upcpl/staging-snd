"use client";
import has from "lodash/has";

import { ReviewPostType } from "@/lib/wordpress/types";

import { useCart } from "@/components/cart/cart-context";

import Image from "@/components/image/Image";
import Shimmer from "@/components/shimmer/Shimmer";

import BlogReviewList from "./BlogReviewList";
import BlogReviewForm from "./BlogReviewForm";
import Link from "next/link";
import { useState } from "react";


export default function ReviewItem({
    item,
    idSeleted,
    onIdSelected,
    lvl = 0,
}: {
    item: ReviewPostType;
    idSeleted: number;
    onIdSelected: (value: number) => void;
    lvl?: number;
}) {
    const { user } = useCart();

    const [showChild, setShowChild] = useState(false);
    const [count, setCount] = useState(has(item._links, "children") ? 0 : -1);

    return (
        <div className="border-bottom last:!border-b-0">
            <div className="d-flex gap-[1.875rem] py-3">
                <div
                    className="rounded-circle overflow-hidden"
                    style={{
                        flex: "0 0 3.75rem",
                        width: "3.75rem",
                        height: "3.75rem",
                    }}
                >
                    <Image
                        src={item.author_avatar_urls[96]}
                        className="w-100 h-100"
                        loading="lazy"
                        alt="image"
                        width="80"
                        height="80"
                        style={{ objectFit: "cover", maxWidth: "100%" }}
                    />
                </div>
                <div className="flex-grow-1">
                    <h6 style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                        <strong dangerouslySetInnerHTML={{ __html: item.author_name }} />
                        {" says:"}
                    </h6>
                    <div
                        className="mb-3 text-secondary"
                        style={{
                            fontSize: "0.875rem",
                            lineHeight: "1.5rem",
                        }}
                        dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                    />
                    <div className="d-flex align-items-center flex-wrap" style={{ gap: 10}}>
                        <div className="flex-grow-1 text-xs text-secondary">{item.date}</div>
                        {lvl < 4 && (
                            <button
                                className="text-pink-600 text-xs fw-semibold"
                                onClick={() => onIdSelected(item.id)}
                            >
                                Reply
                            </button>
                        )}
                        {count !== -1 && (
                            <button
                                className="text-pink-600 text-xs fw-semibold"
                                onClick={() => setShowChild(true)}
                            >
                                Feedbacks
                            </button>
                        )}
                    </div>
                    {idSeleted === item.id && (
                        <div className="mt-3">
                            <BlogReviewForm
                                header={
                                    <>
                                        <h3
                                            id="reply-title"
                                            className="fs-5"
                                            style={{ marginBottom: 6 }}
                                        >
                                            Reply to {item.author_name}{" "}
                                            <small>
                                                <button
                                                    className="text-xs text-pink-600"
                                                    onClick={() => onIdSelected(0)}
                                                >
                                                    Cancel reply
                                                </button>
                                            </small>
                                        </h3>
                                        <p className="text-secondary" style={{ marginBottom: 30 }}>
                                            Logged in as {user?.display_name}.{" "}
                                            <a
                                                className="text-pink-600"
                                                href="https://test.snd.in/wp-admin/profile.php"
                                            >
                                                Edit your profile
                                            </a>
                                            .{" "}
                                            <Link href="/my-account/logout" className="text-pink-600">
                                                Log out?
                                            </Link>{" "}
                                            <span className="required-field-message">
                                                Required fields are marked{" "}
                                                <span className="required">*</span>
                                            </span>
                                        </p>
                                    </>
                                }
                                postId={item.post}
                                parentId={item.id}
                                onCallback={() => setCount(count === -1 ? 1 : count + 1)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showChild && (
                <div style={{ marginLeft: 48 }}>
                    <BlogReviewList
                        key={`review-parent=${item.id}-count=${count}`}
                        postId={item.post}
                        parentId={item.id}
                        idSeleted={idSeleted}
                        onIdSelected={onIdSelected}
                        lvl={lvl + 1}
                        type="loadmore"
                    />
                </div>
            )}
        </div>
    );
}

export function ShimmerReviewItem() {
    return (
        <div className="border-bottom last:!border-b-0">
            <div className="d-flex gap-[1.875rem] py-3">
                <div
                    className="rounded-circle overflow-hidden"
                    style={{
                        flex: "0 0 3.75rem",
                        width: "3.75rem",
                        height: "3.75rem",
                    }}
                >
                    <Shimmer loading width={"100%"} height={"100%"} >
                        <div />
                    </Shimmer>
                </div>
                <div className="flex-grow-1">
                    <Shimmer loading width={"150px"} height={12} >
                        <div />
                    </Shimmer>
                    <Shimmer className="mb-3" loading width={"60%"} height={12} >
                        <div />
                    </Shimmer>
                    <div className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: 10}}>
                        <Shimmer loading width={"100px"} height={12} >
                            <div />
                        </Shimmer>
                        <Shimmer loading width={"120px"} height={12} >
                            <div />
                        </Shimmer>
                    </div>
                </div>
            </div>
        </div>
    )
}