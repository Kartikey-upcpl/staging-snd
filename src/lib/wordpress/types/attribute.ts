export type AttributeTerm = {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string,
    parent: number,
    count: number,
    filter: string,
}

export type Attribute = {
    id: number;
    name: string;
    slug: string;
    type: string;
    order_by: string;
    has_archives: boolean;
    terms: AttributeTerm[];
    layout?: string; 
}