import unescape from "lodash/unescape";
import { TagA } from "./tag-a";
import { TagImg } from "./tag-img";
import { TagDiv } from "./tag-div";
import { TagOther } from "./tag-other";
import { TagStyle } from "./tag-style";
import { TagScript } from "./tag-script";
import { TagIframe } from "./tag-iframe";

import type { HtmlElement } from "./html_type";
import { stringify } from "../libs/himalaya";

export function renderHtml(children: HtmlElement[]) : React.ReactNode | undefined {
    if (children.length < 1) {
        return undefined;
    }
    
    return children.map((child, index) => <ElementHtml key={index} element={child} />);
}

export function ElementHtml({ element }: { element: HtmlElement }) {
    if (element.type === "element") {
        switch (element.tagName) {
            case 'a':
                return <TagA attributes={element.attributes}>{renderHtml(element?.children ?? [])}</TagA>;
            case 'img':
                return <TagImg attributes={element.attributes}>{renderHtml(element?.children ?? [])}</TagImg>;
            case 'div':
                return <TagDiv attributes={element.attributes}>{renderHtml(element?.children ?? [])}</TagDiv>;
            case 'style':
                return <TagStyle attributes={element.attributes} contentChild={stringify(element.children ?? [])} />;
            case 'script':
                return <TagScript attributes={element.attributes} contentChild={stringify(element.children)} />;
            case 'iframe':
                return <TagIframe attributes={element.attributes} />;
            default:
                return <TagOther tagName={element.tagName} attributes={element.attributes}>{renderHtml(element?.children ?? [])}</TagOther>;
        }
    }

    if (element.type === "text") {
        
        return unescape(element?.content);
    }
    
    return undefined;
}