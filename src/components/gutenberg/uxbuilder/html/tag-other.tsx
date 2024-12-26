import React, { ElementType } from 'react';
import type { PropsTag } from "./html_type";
import { attributsToProps, styleStringToObject } from "./html_utils";
import clsx from "clsx";

interface OtherTagProps extends PropsTag {
    tagName: string;
}

export function TagOther({ tagName, attributes, children }: OtherTagProps) {
    const props = attributsToProps(attributes);
    const style = attributes?.find((attr) => attr.key === 'style')?.value ?? '';

    if (tagName === 'span') {
        return (
            <span {...props}  style={styleStringToObject(style)}>{children}</span>
        );
    }

    if (tagName === 'h1') {
        return (
            <h1 {...props} className={clsx([props?.className ?? "", "font-medium text-[1.7em] text-[#000055] leading-[1.3] mb-[0.5em] w-full"])} style={styleStringToObject(style)}>{children}</h1>
        );
    }

    if (tagName === 'h2') {
        return (
            <h2 {...props} className={clsx([props?.className ?? "", "font-medium text-[1.6em] text-[#000055] leading-[1.3] mb-[0.5em] w-full"])} style={styleStringToObject(style)}>{children}</h2>
        );
    }

    if (tagName === 'h3') {
        return (
            <h3 {...props}  style={styleStringToObject(style)}>{children}</h3>
        );
    }

    if (tagName === 'h4') {
        return (
            <h4 {...props} style={styleStringToObject(style)}>{children}</h4>
        );
    }

    if (tagName === 'h5') {
        return (
            <h5 {...props} style={styleStringToObject(style)}>{children}</h5>
        );
    }

    if (tagName === 'h6') {
        return (
            <h6 {...props} style={styleStringToObject(style)}>{children}</h6>
        );
    }

    if (tagName === 'p') {
        return (
            <p {...props} style={styleStringToObject(style)}>{children}</p>
        );
    }

    if (tagName === 'section') {
        return (
            <section {...props} style={styleStringToObject(style)}>{children}</section>
        );
    }

    if (tagName === 'link') {
        return <link {...props} />
    }
    
    const Tag: ElementType = tagName as ElementType;
    if (!!children) {
        return <Tag {...props} style={styleStringToObject(style)}>{children}</Tag>;
    }

    return <Tag {...props} style={styleStringToObject(style)} />;
}