export type LinkedTerm = {
    slug: string,
    product_id: number,
    term: {
        name: string;
    }
}

export type LinkedVariation = {
    attribute: {
        name: string;
    };
    terms: LinkedTerm[]
}