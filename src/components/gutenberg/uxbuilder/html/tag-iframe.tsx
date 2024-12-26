import { formatLink } from "@/utlis/format-link";
import Link from "next/link";
import type { PropsTag } from "./html_type";
import { attributsToProps, styleStringToObject } from "./html_utils";

export function TagIframe({ attributes }: PropsTag) {
    const props = attributsToProps(attributes);
    const style = attributes?.find((attr) => attr.key === 'style')?.value ?? '';

    return (
        <iframe {...props} style={styleStringToObject(style)} loading="lazy" />
    );
}