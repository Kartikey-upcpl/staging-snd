import Script from 'next/script'

import type { PropsTag } from "./html_type";
import { attributsToProps } from "./html_utils";

export function TagScript({ attributes, contentChild }: PropsTag) {
    const props = attributsToProps(attributes);
    return (
        <Script {...props} dangerouslySetInnerHTML={{ __html: contentChild ?? ""}}/>
    );
}