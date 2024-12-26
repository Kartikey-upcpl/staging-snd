"use client";

import React, { LegacyRef, useCallback, useRef, use } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// import { getProductsAction } from "@/components/gutenberg/actions";

import type { Document } from '@/lib/typesense/typesense_type';
import clsx from "clsx";

import Hit from "@/components/hit";

// order support: asc, desc
const ordersupports = ['asc', 'desc'];

// orderby support: date, modified, id, include, title, slug, price, popularity, rating, menu_order, comment_coun t
const orderbysupports = ['date', 'modified', 'id', 'include', 'title', 'slug', 'price', 'popularity', 'rating', 'menu_order', 'comment_count'];

export function getRowColumnClass(options: [string, null][], type: "small" | "medium" | "large"): string | null {

    if (options.length === 3) {
        const valueSm = options[0];
        const valueMd = options[1];
        const valueLg = options[2];

        switch (type) {
            case "medium":
                if (valueMd) {
                    return `row-cols-md-${valueMd}`;
                }
                return null;
            case "large":
                if (valueLg) {
                    return `row-cols-lg-${valueLg}`;
                }
                return null;
            case "small":
                return `row-cols-${valueSm ?? 2}`;
        }
    }

    return null;
}

export function Products({ options, productsPromise }: { options: { [key: string]: any }, productsPromise: Promise<Document[]> }) {
    // const key = "product-grid-" + randomGeneralKey().toString();

    const sliderRef: LegacyRef<SwiperRef> | null = useRef(null);

    const type = options.type ?? "slider";
    const colSpacing = options?.colSpacing ?? "";
    // const productsLength = options?.products ? parseInt(options.products) : 4;
    const responsive = options?.["$responsive"] ?? {};
    const order = options?.order ?? 'asc';
    const orderby = options?.orderby ?? 'date';
    const width = options?.width ?? '';
    const autoSlide = options.autoSlide ?? "";

    // let query = {
    //     page: 1,
    //     per_page: options?.products ? parseInt(options.products) : 10,
    //     order: ordersupports.includes(order) ? order : 'asc',
    //     orderby: orderbysupports.includes(orderby) ? orderby : 'date',
    //     ...(options?.ids && { include: options.ids }),
    //     ...(options?.tags && { tag: options.tags, tag_operator: 'in' }),
    //     ...(options?.cat && { category: options.cat, category_operator: 'in' }),
    // };

    const products: Document[] = use(productsPromise);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const smallColumns = getRowColumnClass(responsive['columns'], "small");
    const mediumColumns = getRowColumnClass(responsive['columns'], "medium");
    const largeColumns = getRowColumnClass(responsive['columns'], "large");

    // return <div>{JSON.stringify(options)}</div>
    switch (type) {
        case "masonry":
        case "row":
            if (colSpacing === 'collapse') {
                return (
                    <div className="container">
                        <div className={clsx(["row gap-y-4", smallColumns, mediumColumns, largeColumns])}>
                            {products && products.map((product, index) => {
                                return (<Hit key={index} hit={product} className="col" />);
                            })}
                        </div>
                    </div>
                );
            }

            // Use bootstrap grid to create the layout
            return (
                <div className={clsx(["row gap-y-4", smallColumns, mediumColumns, largeColumns])}>
                    {products && products.map((product, index) => {
                        return (<Hit key={index} hit={product} className="col" />);
                    })}
                </div>
            );
        default:
            const swiperOptions = {
                autoplay: autoSlide ? { delay: Number(autoSlide), disableOnInteraction: false } : false,
                modules: [Autoplay, Navigation],
                slidesPerView: 5,
                slidesPerGroup: 1,
                effect: "none",
                loop: true,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 14,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 24,
                    },
                    992: {
                        slidesPerView: 4,
                        slidesPerGroup: 1,
                        spaceBetween: 30,
                        pagination: false,
                    },
                    1200: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                        spaceBetween: 35,
                        pagination: false,
                    },
                },
            };

            return (
                <div className={clsx(width !== "full-width" ? "container" : "")} style={{ position: "relative" }}>
                    <Swiper
                        {...swiperOptions}
                        ref={sliderRef}
                        key={`ux-product-data`}
                        className="overflow-hidden"
                        enabled={true}
                    >
                        {products && products.map((product, i) => (
                            <SwiperSlide
                                key={i}
                                className="swiper-slide product-card"
                            >
                                <Hit hit={product} />
                            </SwiperSlide>
                        ))}

                        {/* <!-- /.swiper-wrapper --> */}
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
                </div>
            );
    }

}