'use client';

import { useState, useEffect } from 'react';
import Image from '@/components/image/Image';

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { Gallery, Item } from "react-photoswipe-gallery";

import type { Image as ImageType } from '@/lib/typesense/typesense_type';
import type { Swiper as SwiperType } from 'swiper/types';
import tippy from "tippy.js";

import "swiper/css/thumbs";
import "swiper/css";
import "photoswipe/dist/photoswipe.css";


export default function Slideshow({ images }: { images: ImageType[] }) {
    useEffect(() => {
        tippy("[data-tippy-content]");
    }, []);

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div
            className="product-single__media horizontal-thumbnail product-media-initialized mx-0"
            data-media-type="horizontal-thumbnail"
        >
            <div className="product-single__image">
                <Gallery>
                    <Swiper
                        modules={[Thumbs, Navigation]}
                        slidesPerView={1}
                        navigation={{ prevEl: ".ssnbp1", nextEl: ".ssnbn1" }}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
                        style={{ maxWidth: "100%", overflow: "hidden"}}
                        // wrapperClass="items-center"
                    >
                        {images.map((elm, i) => (
                            <SwiperSlide
                                key={i}
                                className="swiper-slide product-single__image-item !p-0"
                            >
                                <Item
                                    original={elm.src}
                                    thumbnail={elm.thumbnail}
                                    width="674"
                                    height="674"
                                >
                                    {({ ref, open }) => (
                                        <>
                                            <Image
                                                loading="lazy"
                                                className="w-100 aspect-square !object-contain"
                                                src={elm.src}
                                                width="674"
                                                height="674"
                                                alt="image"
                                            />
                                            <a
                                                ref={ref}
                                                onClick={open}
                                                data-fancybox="gallery"
                                                // href="/assets/images/products/product_0.jpg"
                                                className="item-zoom"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="left"
                                                data-tippy-content="Zoom"
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <use href="#icon_zoom" />
                                                </svg>
                                            </a>
                                        </>
                                    )}
                                </Item>
                            </SwiperSlide>
                        ))}
                        <div className="cursor-pointer swiper-button-prev ssnbp1">
                            <svg
                                width="7"
                                height="11"
                                viewBox="0 0 7 11"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <use href="#icon_prev_sm" />
                            </svg>
                        </div>
                        <div className="cursor-pointer swiper-button-next ssnbn1">
                            <svg
                                width="7"
                                height="11"
                                viewBox="0 0 7 11"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <use href="#icon_next_sm" />
                            </svg>
                        </div>
                    </Swiper>
                </Gallery>
            </div>
            <div className="product-single__thumbnail mt-2">
                <Swiper
                    className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode swiper-container-thumbs swiper-thumb-3"
                    modules={[Thumbs, FreeMode]}
                    onSwiper={setThumbsSwiper}
                    slidesPerView={2}
                    spaceBetween={10}
                    breakpoints={{
                        400: {
                            slidesPerView: 3,
                        },
                        700: {
                            slidesPerView: 4,
                        },
                        900: {
                            slidesPerView: 5,
                        },
                        1200: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {images.map((elm, i) => (
                        <SwiperSlide
                            key={i}
                            className="swiper-slide product-single__image-item aspect-square p-0"
                        >
                            <Image
                                loading="lazy"
                                className="h-auto"
                                src={elm.src}
                                srcSet={elm.srcset}
                                sizes="80px"
                                width="104"
                                height="104"
                                alt="image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}