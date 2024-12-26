"use client";

import { LegacyRef, useCallback, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import clsx from "clsx";

interface UxSliderProps {
    options: Record<string, any>; // Options from the backend
    children: JSX.Element[]; // Rendered children elements (like sections or divs)
}

export function UxSliderElement({ options, children }: UxSliderProps) {

    const sliderRef: LegacyRef<SwiperRef> | null = useRef(null);
    const parentRef = useRef(null);
    const [active, setActive] = useState(0);

    // Convert string values to booleans/numbers where necessary
    const style = options.style ?? "";
    const autoSlide = options.autoSlide === "true" || options.autoSlide === true;
    const infinitive = options.infinitive === "true" || options.infinitive === true;
    const arrows = options.arrows === "true" || options.arrows === true;
    const bullets = options.bullets === "true" || options.bullets === true;
    const navColor = options.navColor ?? "";
    const timer = typeof options.timer === "string" ? parseInt(options.timer, 10) : options.timer;
    const slideWidth = options?.slideWidth ?? "100%";
    const classNames = options?.class ?? "";

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <div
            className="overflow-hidden"
            style={{ position: "relative" }}
            ref={parentRef}
        >
            <Swiper
                ref={sliderRef}
                autoplay={autoSlide ? { delay: timer || 3000, disableOnInteraction: false } : false}
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView="auto"
                effect="fade"
                loop={infinitive}
                className={"swiper-container z-0"}
                wrapperClass={clsx("position-relative", classNames)}
                // className="swiper-container js-swiper-slider slideshow slideshow-navigation-white-sm swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
                style={{ height: "auto", padding: style === "shadow" ? "15px 0 25px" : undefined }}
                onActiveIndexChange={(swiper) => setActive(swiper.activeIndex)}
            >
                {children.map((child, index) => (
                    <SwiperSlide
                        key={index}
                        className="position-relative"
                        //   className="swiper-slide swiper-slide-active" 
                        style={{ width: slideWidth }}
                    >
                        <div className={child.props.className}>
                            {child}
                        </div>
                    </SwiperSlide>
                ))}
                {arrows && (
                    <>
                        <div
                            className="products-carousel__prev z-0 cursor-pointer  left-[20px] !mt-0 navigation-sm bg-grey-eeeeee position-absolute d-flex align-items-center justify-content-center"
                            onClick={handlePrev}
                            style={{
                                top: "calc(50% - 8.75px)",
                                marginTop: "0px !important"
                            }}
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
                            className="products-carousel__next z-0 cursor-pointer  right-[20px] !mt-0 navigation-sm bg-grey-eeeeee position-absolute d-flex align-items-center justify-content-center"
                            onClick={handleNext}
                            style={{
                                top: "calc(50% - 8.75px)",
                                marginTop: "0px !important"
                            }}
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
                    </>
                )}
                {bullets && (
                    <div
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{ left: "20%", right: "20%", bottom: 15 }}
                    >
                        {children.map((_, i) => {
                            return <span
                                key={i}
                                className="h-[12px] w-[12px] mx-[5px] border-3 rounded-circle cursor-pointer"
                                style={{
                                    borderColor: navColor === "light" ? "#fff" : "#111",
                                    backgroundColor: i === active ? navColor === "light" ? "#fff" : "#111" : undefined,
                                    opacity: i === active ? 1 : 0.4,
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!sliderRef.current || i === active) return;
                                    sliderRef.current.swiper.slideTo(i);
                                }}
                            />
                        })}
                    </div>
                )}

            </Swiper>
        </div>

    );
};
