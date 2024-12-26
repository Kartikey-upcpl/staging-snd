export type Element = {
    tag: string;
    options: { [key: string]: any };
    content?: string;
    children?: Element[];
}