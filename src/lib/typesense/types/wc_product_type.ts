export type WcProductDefaultAttribute = {
    id: number;
    name: string;
    option: string;
}   

export type WcProduct = {
    id: number;
    name: string;
    slug: string;
    default_attributes: WcProductDefaultAttribute[],
    yoast_head_json: {
        [key: string]: any;
    },
    acf: {
        [key: string]: string | number | boolean | null | undefined;
    }
}   

export type WcProductDocument = Omit<WcProduct, 'id'> & {
    id: string;
    rowID: number;
};