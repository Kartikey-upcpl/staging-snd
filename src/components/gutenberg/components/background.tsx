'use client';

import React, { use } from "react";
import { ApiError, isApiError } from "@/lib/type-guards";
import Image from "@/components/image/Image";

import { classnames } from "@/utlis/classnames";
import { Media, MediaSize } from "@/lib/wordpress/types";

export function BackgroundComponent({
    mediaPromise,
    size,
}: {
    mediaPromise: Promise<Media | ApiError> | undefined;
    size: string;
}) {

    const media: Media | ApiError | undefined = mediaPromise ? use(mediaPromise) : undefined;

    if (media === undefined || isApiError(media)) {
        return undefined;
    }

    let src = media.source_url;
    let width = media.media_details.width;
    let height = media.media_details.height;

    const dataSize: MediaSize | undefined | null = media.media_details.sizes[size];

    if (dataSize) {
        src = dataSize.source_url;    
        width = dataSize.width;    
        height = dataSize.height;    
    }
    
    return (
        <Image
            decoding="async"
            width={width}
            height={height}
            src={src}
            className={classnames(
                "bg",
                {
                    [`attachment-${size} size-${size}`]: size !== "" && size !== "large",
                    "attachment- size-": size === "" || size === "large",
                }
            )}
            alt={media.alt_text}
        />
    );
}
