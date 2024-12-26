import { getPostCategoryBySlug, getWpUser, getPostReviews } from "@/lib/wordpress";
import { WpPost, WpPostCategory } from "@/lib/wordpress/types";
import Link from "next/link";

import BlocCategoryItem from "./BlogCategoryItem";
import BlogAuthor from "./BlogAuhor";
import BlogReviewForm from "./BlogReviewForm";
import BlogReview from "./BlogReview";

export default function PostContainer({ post, children }: { post: WpPost, children?: React.ReactNode }) {
    const authorPromise = getWpUser(post.author);
    return (
        <>
            <div className="pbg-pink-600 position-relative overflow-hidden" style={{textShadow: "1px 1px 1px rgba(0,0,0,.2)"}}>

                <div className="overflow-hidden h-full left-0 !m-0 !p-0 position-absolute right-0 top-0 bottom-0" style={{boxShadow: "inset 0 0 30px 0 rgba(0,0,0,.1)"}}>
                    <div
                        className="bg-fill overflow-hidden left-0 !m-0 !p-0 position-absolute right-0 top-0 bottom-0"
                        style={{
                            backgroundImage: `url(${post.image ?? "/assets/images/no-image.jpg"})`,
                            backgroundRepeat: "no-repeat !important",
                            backgroundSize: 'cover !important',
                            backgroundPosition: "top",
                            objectPosition: 'top',
                            height: "362.556px",
                            transform: "translate3d(0px, -32.04px, 0px)",
                            backfaceVisibility: "hidden",
                            transition: "opacity .6s",
                            willChange: 'transform !important'
                        }}
                    />
                    <div className="h-full left-0 !m-0 !p-0 position-absolute right-0 top-0 bottom-0" style={{backgroundColor: "rgba(0,0,0,.5)"}} />
                </div>

                <div className="container position-relative d-flex align-items-center justify-content-between w-full flex-nowrap" style={{ minHeight: 300, paddingTop: "20px", color: "#f1f1f1", fontSize: "1.15em" }}>
                    <div className="text-center text-white" style={{margin: "0 auto", maxHeight: "100%"}}>
                        {post.post_categories.length > 0 && (
                            <h6 className="fw-semibold uppercase" style={{ fontSize: "0.7em", marginBottom: "0.5em"}}>
                                {post.post_categories.flatMap((category: WpPostCategory, i: number) => {
                                    const categoryPromise = getPostCategoryBySlug(category.slug);

                                    const child = <BlocCategoryItem key={`category-${category.slug}`} category={category} categoryPromise={categoryPromise}/>

                                    if (i < post.post_categories.length - 1) {
                                        return [
                                            child,
                                            <span key={`serapator-${i}`}>{" | "}</span>
                                        ];
                                    }

                                    return [child];
                                })}
                            </h6>
                        )}
                        <h1 className="text-white" style={{ fontSize: "1.7em", lineHeight: 1.3, marginBottom: "0.5em"}} dangerouslySetInnerHTML={{__html: post.post_title}}/>
                        <div className="d-block w-full" style={{margin: "1em auto", backgroundColor: "hsla(0,0%,100%,.3)", height: 3, maxWidth: 30}} />
                        <div className="uppercase" style={{fontSize: "0.7em", lineHeight: 1.2, letterSpacing: "0.05em", margin: "0px auto"}}>
                            <span>Posted on <Link href={`/${post.slug}`} rel="bookmark" className="hover:text-white"><time >September 11, 2024</time></Link></span> <span>by <span><BlogAuthor authorName={post.post_author} authorPromise={authorPromise}/></span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                {children}
            </div>
            {(post.comment_status === "open" || post.post_comment_count > 0) && (
                <div className="container border-t pb-5 pt-4">
                    <BlogReview post={post}/>
                </div>
            )} 
        </>
    )
}