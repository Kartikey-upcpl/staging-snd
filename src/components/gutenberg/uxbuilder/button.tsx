import { formatLink } from "@/utlis/format-link";
import Link from "next/link";
import clsx from "clsx";

function getColorClassName(color: string, style: string) {
    switch(color) {
        case 'primary':
            switch(style) {
                case "outline":
                    return "!border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white";
                case "link":
                    return "text-pink-600 hover:text-pink-700";
                case "underline":
                    return "text-pink-600 hover:text-pink-700 before:bg-pink-600 before:absolute before:bottom-0 before:left-[20%] before:w-[60%] before:h-0.5 before:opacity-30 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:bg-pink-700 hover:before:opacity-100";
                default:
                    return "bg-pink-600 text-white hover:bg-pink-700";
            }
            
        case 'secondary':
            switch(style) {
                case "outline":
                    return "!border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white";
                case "link":
                    return "text-pink-600 hover:text-pink-700";
                case "underline":
                    return "text-pink-600 hover:text-pink-700 before:bg-pink-600 before:absolute before:bottom-0 before:left-[20%] before:w-[60%] before:h-0.5 before:opacity-30 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:bg-pink-700 hover:before:opacity-100";
                default:
                    return "bg-pink-600 text-white hover:bg-pink-700";
            }
        case 'alert':
            switch(style) {
                case "outline":
                    return "!border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
                case "link":
                    return "text-red-600 hover:text-red-700";
                case "underline":
                    return "text-red-600 hover:text-red-700 before:bg-red-600 before:absolute before:bottom-0 before:left-[20%] before:w-[60%] before:h-0.5 before:opacity-30 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:bg-red-700 hover:before:opacity-100";
                default:
                    return "bg-red-600 text-white hover:bg-red-700";
            }
        case 'success':
            switch(style) {
                case "outline":
                    return "!border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white";
                case "link":
                    return "text-lime-600 hover:text-lime-700";
                case "underline":
                    return "text-lime-600 hover:text-lime-700 before:bg-lime-600 before:absolute before:bottom-0 before:left-[20%] before:w-[60%] before:h-0.5 before:opacity-30 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:bg-lime-700 hover:before:opacity-100";
                default:
                    return "bg-lime-600 text-white hover:bg-lime-700";
            }
        case 'white':
            switch(style) {
                case "outline":
                    return "!border-gray-700 text-gray-700";
                case "link":
                    return "text-gray-700";
                case "underline":
                    return "text-gray-700 before:bg-gray-600 before:absolute before:bottom-0 before:left-[20%] before:w-[60%] before:h-0.5 before:opacity-30 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700 hover:before:opacity-100";
                default:
                    return "!border-gray-200 bg-white text-gray-600 hover:!bg-gray-200";
            }
        default:
            return "";
    }
}

function getFontClassName(size: string) {
    switch(size) {
        case "xxsmall":
            return "text-[9px] min-h-[18px] leading-[17px] py-[1px]";
        case "xsmall":
            return "text-[9.5px] min-h-[22px] leading-[20.8px] py-[1px]";
        case "smaller":
            return "text-[10px] min-h-[24px] leading-[22px] py-[1px]";
        case "small":
            return "text-[11px] min-h-[26px] leading-[24px] py-[1px]";
        case "large":
            return "text-[15px] min-h-[37px] leading-[34px] py-[1px]";
        case "larger":
            return "text-[17.5px] min-h-[42px] leading-[38.5px] py-[1px]";
        case "xlarge":
            return "text-[20px] min-h-[46px] leading-[44.5px] py-[2.5px]";
        case "xxlarge":
            return "text-[27px] min-h-[60px] leading-[59px] py-[4px]";
        default:
            return "text-[13px] min-h-[30px] leading-[28px]";
    }
}

function getPaddingClassName(style: string, size: string) {
    if (style === 'link' || style === "underline") {
        switch(size) {
            case "xxsmall":
                return "px-[1.2px]";
            case "xsmall":
                return "px-[1.4px]";
            case "smaller":
                return "px-[1.5px]";
            case "small":
                return "px-[1.6px]";
            case "large":
                return "px-[2.3px]";
            case "larger":
                return "px-[2.6px]";
            case "xlarge":
                return "px-[3px]";
            case "xxlarge":
                return "px-[4px]";
            default:
                return "px-[2px]";
        }
    }
    switch(size) {
        case "xxsmall":
            return "px-[9.5px]";
        case "xsmall":
            return "px-[11px]";
        case "smaller":
            return "px-[12px]";
        case "small":
            return "px-[13px]";
        case "large":
            return "px-[18.5px]";
        case "larger":
            return "px-[21px]";
        case "xlarge":
            return "px-[24.5px]";
        case "xxlarge":
            return "px-[32.5px]";
        default:
            return "px-[16px]";
    }
}

export function Button({ options }: { options: { [key: string]: any }}) {
    let link = options?.link ?? '#';
    const text = options?.text ?? 'Button';
    const letterCase = options?.letterCase ?? '';
    const color = options?.color ?? '';
    const style = options?.style ?? '';
    const size = options?.size ?? '';


    const colorClass = getColorClassName(color, style);
    const fontClass = getFontClassName(size);
    const paddingClass = getPaddingClassName(style, size);
    const letterClass = letterCase === "lowercase" ? "lowercase": "uppercase";

    return (
        <Link
            href={formatLink(link)}
            className={clsx( {
                [letterClass]: true,
                [paddingClass]: true,
                [fontClass]: true,
                [colorClass]: colorClass !== "",
                "border border-transparent rounded-none box-border cursor-pointer inline-block max-w-full relative font-bold text-center align-middle mb-3": true
            })}
        >{text}</Link>
    );
}