"use client";
// import { getStyleTag, randomGeneralKey } from "./definitions";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState, LegacyRef, use } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// import { getPostsAction } from "../actions";
import type { WpPost } from "@/lib/wordpress/types";

import Image from "@/components/image/Image";
import Shimmer from "@/components/shimmer/Shimmer";

function getWidthColumn(columns: any): string | null {
    const value: number | null = columns && !isNaN(Number(columns)) && Number(columns) > 0 ? Number(columns) : null;
    if (value !== null) {
        return `${100 / value}%`
    }

    return null;
}

function convertOptions(options: { [key: string]: any }): { [key: string]: any } {
    const columns: number = options?.columns ?? 1;
    const responsiveColumns: any[] = options?.["$responsive"]?.["columns"] ?? [];
    const colSpacing = options.colSpacing ?? "";

    let responsiveSliderWidthItem = [...responsiveColumns];

    for (let i = 0; i < responsiveSliderWidthItem.length; i++) {
        responsiveSliderWidthItem[i] = getWidthColumn(responsiveSliderWidthItem[i]);
    }

    let sliderPadding = "0px 15px";
    let containerMargin = "0px -15px";

    switch (colSpacing) {
        case "collapse":
            sliderPadding = "0px";
            containerMargin = "0px";
            break;
        case "xsmall":
            sliderPadding = "0px 2px";
            containerMargin = "0px -2px";
            break;
        case "small":
            sliderPadding = "0px 10px";
            containerMargin = "0px -10px";
            break;
        case "large":
            sliderPadding = "0px 30px";
            containerMargin = "0px -30px";
            break;
    }

    return {
        ...options,
        sliderMarginContainer: containerMargin,
        sliderPadding: sliderPadding,
        sliderWidthItem: getWidthColumn(columns),
        "$responsive": {
            ...(options?.["$responsive"] ?? {}),
            sliderWidthItem: responsiveSliderWidthItem,
        }
    }
}

export function BlogPosts(props: {
    options: { [key: string]: any };
    postsPromise: Promise<WpPost[]>;
}) {
    const sliderRef: LegacyRef<SwiperRef> | null = useRef(null);

    // const [posts, setPosts] = useState<WpPost[]>([]);
    // const [loading, setLoading] = useState(true);
    const posts = use(props.postsPromise);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    // const key = "blog_posts-" + randomGeneralKey().toString();

    const options = convertOptions(props.options);

    const type = options.type ?? "slider";
    const width = options.width ?? "";
    const autoSlide = options.autoSlide ?? "";
    const sliderBullets = options.sliderBullets === "true";

    const postsLength = !isNaN(Number(props.options.posts)) ? Number(props.options.posts) : 10;

    const rules = {
        sliderMarginContainer: {
            selector: ".swiper-container",
            property: "margin"
        },
        sliderWidthItem: {
            selector: ".swiper-slide",
            property: "width"
        },
        sliderPadding: {
            selector: ".swiper-slide",
            property: "padding"
        }
    }

    // const style = getStyleTag(key, rules, options);


    // Create array shimmer with length = posts
    let shimmers = postsLength > 0 ? Array.from({ length: postsLength }) : [];

    switch (type) {
        default:
            const swiperOptions = {
                autoplay: autoSlide ? { delay: Number(autoSlide), disableOnInteraction: false } : false,
                modules: [Autoplay, Navigation],
                slidesPerView: 3,
                slidesPerGroup: 1,
                effect: "none",
                loop: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        slidesPerGroup: 2,
                        spaceBetween: 14,
                    },
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 3,
                        spaceBetween: 24,
                    },
                    992: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 30,
                        pagination: false,
                    },
                },
            };

            return (
                <div className={clsx(width !== "full-width" ? "container" : "")} style={{ position: "relative" }}>
                    <Swiper
                        {...swiperOptions}
                        ref={sliderRef}
                        key={`blog-posts-data`}
                        enabled={true}
                        className="overflow-hidden"
                    >
                        {posts && posts.map((post, index) => (
                            <SwiperSlide
                                key={index}
                                className="swiper-slide product-card"
                            >
                                <a href={`/${post.slug}`} className="position-relative" >
                                    <div className="position-absolute top-0 left-0 right-0 h-[200px] overflow-hidden z-10">
                                        <Image src={post.image ?? ''} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="bg-light p-4 mx-4 mt-[170px] position-relative z-50 flex flex-col items-center text-center">
                                        <h5 className="text-sm font-semibold line-clamp-2 text-clip" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        <div className="w-[50px] h-0.5 bg-gray-100 my-2" />
                                        <div className="text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div
                        className="cursor-pointer products-carousel__prev navigation-sm bg-grey-eeeeee position-absolute top-50 d-flex align-items-center justify-content-center"
                        onClick={handlePrev}
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <use href="#icon_prev_md" />
                        </svg>
                    </div>
                    {/* <!-- /.products-carousel__prev --> */}
                    <div
                        className="cursor-pointer products-carousel__next navigation-sm bg-grey-eeeeee position-absolute top-50 d-flex align-items-center justify-content-center"
                        onClick={handleNext}
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <use href="#icon_next_md" />
                        </svg>
                    </div>

                    {/* {style.length > 0 && <style dangerouslySetInnerHTML={{ __html: style }} />} */}
                </div>
            );
    }
}