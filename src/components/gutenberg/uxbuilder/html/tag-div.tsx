import type { PropsTag } from "./html_type";
import { attributsToProps, styleStringToObject } from "./html_utils";

export function TagDiv({ attributes, children }: PropsTag) {
    const props = attributsToProps(attributes);
    const style = attributes?.find((attr) => attr.key === 'style')?.value ?? '';

    return (
        <div {...props} style={styleStringToObject(style)}>{children}</div>
    );
}