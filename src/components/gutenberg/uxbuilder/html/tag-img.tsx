'use client';

import type { PropsTag } from "./html_type";
import { attributsToProps, styleStringToObject } from "./html_utils";
import clsx from "clsx";
// import LazyLoad from 'react-lazyload';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

export function TagImg({ attributes }: PropsTag) {
    const props = attributsToProps(attributes);
    const style = attributes?.find((attr) => attr.key === 'style')?.value ?? '';
    const height = props?.height ?? 680;
    const dataHeight = props['data-height'];

    return (
        // <LazyLoad className="d-inline" height={680} offset={100}>
        //     <img
        //         {...props}
        //         className={clsx([props?.className ?? "", "inline-block h-auto max-w-full"])}
        //         style={styleStringToObject(style)}
        //         loading="lazy"
        //     />
        // </LazyLoad>
        // <LazyLoadImage
        //     className={clsx([props?.className ?? "", "inline-block h-auto max-w-full"])}
        //     height={dataHeight ?? height}
        //     alt={props.alt}
        //     effect="blur"
        //     style={styleStringToObject(style)}
        //     wrapperProps={{
        //         // If you need to, you can tweak the effect transition using the wrapper style.
        //         style: { transitionDelay: "1s" },
        //     }}
        //     src={props.src}
        // />
        <img
            {...props}
            className={clsx([props?.className ?? "", "inline-block h-auto max-w-full"])}
            style={styleStringToObject(style)}
            loading="lazy"
        />
    );
}