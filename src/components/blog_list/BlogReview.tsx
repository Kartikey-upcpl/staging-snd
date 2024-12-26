'use client';
import React, { use, useState } from "react";

import Link from "next/link";

import { WpPost } from "@/lib/wordpress/types";
import { useCart } from "@/components/cart/cart-context";

import BlogReviewList from "./BlogReviewList";
import BlogReviewForm from "./BlogReviewForm";

export default function BlogReview({ post } : { post: WpPost }) {
    const { user } = useCart();
    
    const [ idSeleted, setIdSeleted] = useState(0);
    const [ count, setCount ] = useState(post.post_comment_count);

    return (
        <>
            {count > 0 && (
                <>
                    <h3 className="fw-semibold fs-4 mb-3" dangerouslySetInnerHTML={{ __html: `${count} thoughts on “${post.post_title}”`}} />
                    <BlogReviewList
                        key={`reviews-count=${count}`}
                        postId={post.id}
                        idSeleted={idSeleted}
                        onIdSelected={setIdSeleted}
                    />
                </>
            )}
            {idSeleted === 0 && (
                <>
                    {count > 0 && (<div className="mt-5"/>)}  
                    <BlogReviewForm
                        header={
                            <>
                                <h5 className="fs-5" style={{ marginBottom: 6 }}>Leave a Reply</h5>
                                <p className="text-secondary" style={{ marginBottom: 30 }}>Logged in as {user?.display_name}. <a className="text-pink-600" href="https://test.snd.in/wp-admin/profile.php">Edit your profile</a>. <Link href="/my-account/logout" className="text-pink-600">Log out?</Link> <span className="required-field-message">Required fields are marked <span className="required">*</span></span></p>
                            </>
                        }
                        postId={post.id}
                        onCallback={() => setCount(count + 1)}
                    />
                </>
            )}
        </>
    );
}