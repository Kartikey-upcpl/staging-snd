import { CSSProperties, ElementType, ReactNode } from "react";
import { classnames } from "@/utlis/classnames";
import { randomGeneralKey, StyleType, KEY_MAX_MEDIUM_MEDIA_CSS, KEY_MAX_SMALL_MEDIA_CSS, convertStyleToString, getValueReponsiveWithKey, getColumnClass } from "./definitions";
import clsx from "clsx";
import { formatLink } from "@/utlis/format-link";
import Link from "next/link";


function HeadingText({ tag, className, children, style }: { tag: string, className?: string, children: React.ReactNode, style?: React.CSSProperties }) {

    const titleClass = "flex items-center justify-between flex-wrap relative w-full text-[#000055] font-medium mb-[0.5rem]";
    switch(tag) {
        case "h1":
            return (
                <h1 className={clsx([className ?? "", titleClass, "text-[23px] leading-[30px]"])} style={style}>
                    {children}
                </h1>
            );
        case "h2":
            return (
                <h2 className={clsx([className ?? "", titleClass, "text-[21px] leading-[28px]"])} style={style}>
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3 className={clsx([className ?? "", titleClass, "text-[17px] leading-[27px]"])} style={style}>
                    {children}
                </h3>
            );
        default:
            return (
                <h4 className={clsx([className ?? "", titleClass, "text-[15px] leading-[24px]"])} style={style}>
                    {children}
                </h4>
            );
    }
}

export function TitleElement({ options }: { options: { [key: string]: any } }) {

    const style = options.style ?? "normal";
    const text = options.text ?? "";
    const tagName = options.tagName ?? "";
    const color = options.color ?? "";
    const icon = options.icon ?? "";
    const width = options.width ?? "";
    const marginTop = options.marginTop ?? "";
    const marginBottom = options.marginBottom ?? "";
    const size = options.size ?? "";
    const linkText = options.linkText ?? "";
    const link = options.link ?? "";
    const target = options.target ?? "";
    const rel = options.rel ?? "";

    switch(style) {
        default:
            return (
                <div
                    className="container mb-4 after:clear-both after:content-[''] after:table"
                    style={{
                        ...(width !== "" && {maxWidth: width}),
                        ...(marginTop !== "" && {marginTop: marginTop}),
                        ...(marginBottom !== "" && {marginBlock: marginBottom}),
                    }}
                >
                    <HeadingText
                        tag={tagName}
                        className="border-b-2"
                    >
                        <span
                            className="uppercase border-b-2 mb-[-2px] mr-[15px] pb-[7.5px]"
                            style={{
                                borderColor: "rgba(0, 0, 0, .1)",
                                ...(color !== "" && { color: color }),
                                ...(size !== "" && { fontSize: `${size}%` }),
                            }}
                        >
                                {icon !== "" && (<i className={icon} />)}
                                {text}
                        </span>
                        {linkText.trim() !== "" && (
                            <a className={'!block text-[0.8em] text-[#334862] ml-auto pl-[15px]'} href={formatLink(link)} target={target} rel={rel.trim() !== "" ? `${rel} noopener`:"noopener"}>{linkText}<i className="icon-angle-right"></i></a>
                        )}
                    </HeadingText>
                </div>
            )
    }

    // const style = options.style ?? "normal";
    // const text = options.text ?? "Lorem ipsum dolor sit amet...";
    // const sub_text = options.sub_text ?? "";
    // const tagName = options.tagName ?? "h3";
    // const color = options.color ?? "";
    // const icon = options.icon ?? "";
    // const width = options.width ?? "";
    // const marginTop = options.marginTop ?? "";
    // const marginBottom = options.marginBottom ?? "";
    // const size = options.size ?? "";
    // const linkText = options.linkText ?? "";
    // const link = options.link ?? "";
    // const target = options.target ?? "";
    // const rel = options.rel ?? "";
    // const classOption = options.class ?? "";
    // const visibility = options.visibility ?? "";

    // let smallTextElement: ReactNode | undefined;
    // if (sub_text) {
    //     smallTextElement = <small className="sub-title">{sub_text}</small>
    // }

    // let linkOutputElement: ReactNode | undefined;
    // if (linkText) {
    //     linkOutputElement = <Link href={formatLink(link)} target={target} rel={rel}>{linkText} <i className="icon-angle-right" /></Link>;
    // }

    // let iconElement: ReactNode | undefined;

    // if (icon) {
    //     iconElement = <i className={icon} />;
    // }

    // const Tag = tagName as ElementType;

    // let styleSpan: CSSProperties = {};

    // if (size && size !== '100' && size !== 100) {
    //     styleSpan["fontSize"] = `${size}%`;
    // }

    // if (color) {
    //     styleSpan["color"] = color;
    // }

    // return (
    //     <div
    //         className={clsx(
    //             "container section-title-container",
    //             {
    //                 [classOption]: classOption !== "",
    //                 [visibility]: visibility !== "",
    //             }
    //         )}
    //         style={{
    //             ...(width !== "" && { maxWidth: width }),
    //             ...(marginTop !== "" && { marginTop: marginTop }),
    //             ...(marginBottom !== "" && { marginBlock: marginBottom }),
    //         }}
    //     >
    //         <Tag
    //             tag={tagName}
    //             className={`section-title section-title-${style}`}
    //         >
    //             <b />
    //             <span className="section-title-main" style={styleSpan}>
    //                 {iconElement}
    //                 {text}
    //                 {sub_text}
    //             </span>
    //             <b />
    //             {linkText}
    //         </Tag>
    //     </div>
    // );
}