import { CSSProperties } from "react";
import { Attributes } from "./html_type";


const attributes_allows = [
    'class',
    'id',
    'href',
    'rel',

    'src',
    'alt',

    'width',
    'height',

    'data-height',
];

export function attributsToProps(attributes?: Attributes) {

    if (!attributes) {
        return {};
    }

    const props = attributes?.reduce<{ [index: string]: string }>((acc, attr) => {

        if (!attributes_allows.includes(attr.key)) {
            return acc;
        }

        // TODO: parse style attribute
        if (attr.key === 'style') {
            return acc;
        }
        // class => className
        if (attr.key === 'class') {
            acc['className'] = attr.value;
            return acc;
        }
        acc[attr.key] = attr.value;
        return acc;
    }, {});

    return props;
}

export function styleStringToObject(style: string): CSSProperties {
    
    if (style.trim().length > 0) {
        return style
        .split(';')
        .reduce((acc: CSSProperties, property: string) => {
            if (property) {
                const [key, value] = property.split(':').map(item => item.trim());
                const jsKey: string = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
                // @ts-ignore
                acc[jsKey] = value;
            }
            return acc;
        }, {});
    }
    return {};
}