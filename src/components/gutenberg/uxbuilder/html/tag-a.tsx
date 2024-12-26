import { formatLink } from "@/utlis/format-link";
import Link from "next/link";
import type { PropsTag } from "./html_type";
import { attributsToProps, styleStringToObject } from "./html_utils";

export function TagA({ attributes, children }: PropsTag) {
    const props = attributsToProps(attributes);
    const href = attributes?.find((attr) => attr.key === 'href')?.value ?? '#';
    const style = attributes?.find((attr) => attr.key === 'style')?.value ?? '';

    return (
        <Link {...props} href={formatLink(href)} style={styleStringToObject(style)}>{children}</Link>
    );
}