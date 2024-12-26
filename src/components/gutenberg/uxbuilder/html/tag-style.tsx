import type { PropsTag } from "./html_type";
import { attributsToProps } from "./html_utils";

export function TagStyle({ attributes, contentChild }: PropsTag) {

    const props = attributsToProps(attributes);

    return (
        <style suppressHydrationWarning {...props} dangerouslySetInnerHTML={{__html: contentChild ?? ""}}/>
    );
}