import type { Element } from "./flatsome_block_type";
import { AvatarUrl } from "./image_type";

/// ========================================= Wordpress Types =========================================

// Post type one of "post" or "page"
export type PostType = "post" | "page";

// PostTitle type
export type PostTitle = {
    rendered: string;
}

// PostTitle type
export type WpPostCategory = {
    id: number;
    count: number;
    description: string;
    name: string;
    slug: string;
    parent: string;
}

// Block type
export type Block = {
    blockName: string;
    innerBlocks: Block[];
    innerHTML: string;
    innerContent: string[];
    attrs: {
        [key: string]: any;
    };
}

export type WpPostType = {
    id: number;
    date: string;
    modified: string;
    slug: string;
    status: string;
    type: PostType;
    title: PostTitle,
    content: PostTitle;
    excerpt: PostTitle,
    author: number,
    featured_media: number,
    comment_status: string,
    ping_status: string,
    template: string,
    class_list: string[],
    flatsome_blocks?: Element;
    yoast_head?: string;
    yoast_head_json?: {[key: string]: any};
    blocks: Block[];    
}

export type WpPost = Omit<WpPostType, 'type'> & {
    post_title: string,
    type: "post";
    sticky: boolean,
    format: string,
    categories: number[],
    tags: any[],
    post_categories: WpPostCategory[];
    post_tags: any[];
    post_author: string;
    post_author_avatar_urls?: AvatarUrl;
    post_comment_count: number;
    image?: string,
    thumb?: string,
    thumb_medium?: string,
    images?: {[key: string]: string},
}

export type WpPage = Omit<WpPostType, 'type'> & {
    type: "page";
    parent: number;
    menu_order: number;
}

export type WPClientType<T> = {
    data: T,
    headers?: Headers,
}

export type WpPostPagination = {
    data: WpPost[],
    totalItem: number,
    totalPage: number,
}