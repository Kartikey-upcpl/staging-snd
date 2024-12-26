import { Image } from '@/lib/wordpress/types/image_type';

export type Category = {
    count: number;
    description: string;
    id: number;
    image: Image | null;
    name: string;
    parent: number;
    permalink: string;
    review_count: number;
    slug: string;
};

export type WcCategoryImage = {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
};

export type WcCategory = {
    id: number;
    name: string;
    count: number;
    description: string;
    image: WcCategoryImage | null;
    parent: number;
    display: string;
    slug: string;
    menu_order: number;
};