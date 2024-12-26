export type Attribute = {
    key: string;
    value: string;
}

export type Attributes = Attribute[];

export type HtmlElement = {
    type: string;
    tagName: string;
    attributes?: Attributes;
    children?: HtmlElement[];
    content?: string;
}

export interface PropsTag {
    attributes?: Attributes;
    children?: React.ReactNode | undefined;
    contentChild?: string,
}
