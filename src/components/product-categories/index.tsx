"use client";

import React, { LegacyRef, useCallback, useRef, use } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "@/components/image/Image";

// import { getProductsAction } from "@/components/gutenberg/actions";

import type { Document } from "@/lib/typesense/typesense_type";
import { WcCategory } from "@/lib/wordpress/types";

import clsx from "clsx";
import { ApiError, isApiError } from "@/lib/type-guards";


export function getRowColumnClass(
    options: [string, null][],
    type: "small" | "medium" | "large"
): string | null {
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

export function ProductCategories({
    options,
    categoriesPromise,
}: {
    options: { [key: string]: any };
    categoriesPromise: Promise<WcCategory[] | ApiError>;
}) {
    const type = options.type ?? "slider";
    const colSpacing = options?.colSpacing ?? "";
    const width = options?.width ?? "";

    // const productsLength = options?.products ? parseInt(options.products) : 4;
    const responsive = options?.["$responsive"] ?? {};

    const categories: WcCategory[] | ApiError = use(categoriesPromise);

    const smallColumns = getRowColumnClass(responsive["columns"], "small");
    const mediumColumns = getRowColumnClass(responsive["columns"], "medium");
    const largeColumns = getRowColumnClass(responsive["columns"], "large");

    if (isApiError(categories)) {
        return undefined;
    }

    switch (type) {
        case "masonry":
        case "row":
            if (width !== "full-width") {
                return (
                    <div className="container">
                        <div
                            className={clsx([
                                "row gap-y-4",
                                smallColumns,
                                mediumColumns,
                                largeColumns,
                            ])}
                        >
                            {categories &&
                                categories.map((cate, index) => {
                                    return (
                                        <div key={index}>
                                            <CategoryItem item={cate} options={options} />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                );
            }

            // Use bootstrap grid to create the layout
            return (
                <div
                    className={clsx([
                        "row gap-y-4",
                        smallColumns,
                        mediumColumns,
                        largeColumns,
                    ])}
                >
                    {categories &&
                        categories.map((cate, index) => {
                            return (
                                <div key={index}>
                                    <CategoryItem item={cate} options={options} />
                                </div>
                            );
                            // return (<Hit key={index} hit={product} className="col" />);
                        })}
                </div>
            );
        default:
            return undefined;
    }
}

function CategoryItem({
    item,
    options,
}: {
    item: WcCategory;
    options: { [key: string]: any };
}) {
    const imageHeight = options?.imageHeight ?? "";
    const imageWidth = options?.imageWidth ?? "";
    const imageRadius = options?.imageRadius ?? "";
    const textAlign = options?.imageRadius ?? "center";
    const textSize = options?.imageRadius ?? "";
    const textBg = options?.textBg ?? "";
    const textColor = options?.textColor ?? "";
    const textPadding = options?.textPadding ?? "";

    const width = imageWidth ? imageWidth : 100;
    const borderRadius =
        imageRadius && imageRadius !== "0" && imageRadius !== 0
            ? imageRadius
            : undefined;

    let alignText = "text-center";

    switch (textAlign) {
        case "left":
            alignText = "text-start";
            break;
        case "right":
            alignText = "text-end";
            break;
    }

    let fontSizeClass = "";
    switch (textSize) {
        case "xsmall":
            fontSizeClass = "text-[0.65em]";
            break;
        case "small":
            fontSizeClass = "text-[0.7em]";
            break;
        case "large":
            fontSizeClass = "text-[1em]";
            break;
        case "xlarge":
            fontSizeClass = "text-[1.1em]";
            break;
    }

    return (
        <div className="bg-white shadow-md p-2">
            <a>
                <div
                    className="h-auto mx-auto overflow-hidden position-relative"
                    style={{
                        width: `${width}%`,
                        borderRadius: imageRadius ? `${borderRadius}%` : undefined,
                    }}
                >
                    <div
                        className={clsx({
                            "bg-center bg-cover h-auto overflow-hidden position-relative": imageHeight !== "",
                        })}
                        style={{ paddingTop: imageHeight !== "" ? imageHeight : undefined }}
                    >
                        <Image
                            src={item.image?.src}
                            className={clsx({
                                "absolute bottom-0 left-0 right-0 top-0 height-100 w-100  object-cover object-center": imageHeight !== "",
                            })}
                        />
                    </div>
                </div>
                <div
                    className={clsx({
                        "posistion-relative w-100": true,
                        [alignText]: true,
                    })}
                    style={{ backgroundColor: textBg, padding: textPadding }}
                >
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <h5
                            className={clsx({
                                "uppercase overflow-hidden text-ellipsis whitespace-normal fw-semibold": true,
                                [fontSizeClass]: fontSizeClass !== "",
                            })}
                            style={{
                                display: "-webkit-box",
                                height: "52px",
                                lineHeight: "24px",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                paddingTop: "4px",
                                marginBottom: "0.1em",
                                marginTop: "0.1em",
                                color: textColor === "light" ? "#000055" : "#fff",
                            }}
                            dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                    </div>
                </div>
            </a>
        </div>
    );
}
