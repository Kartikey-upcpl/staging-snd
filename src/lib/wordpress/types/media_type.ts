export type Media = {
    id: number;
    guid: MediaTitle,
    date: string,
    date_gmt: string,
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    type: string,
    link: string,
    title: MediaTitle;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    template: string;
    class_list: string[];
    description: MediaTitle;
    caption: MediaTitle;
    alt_text: string;
    media_type: string;
    media_details: MediaDetail;
    post: number;
    source_url: string;
};

export type MediaTitle = {
    rendered: string;
}

export type MediaDetail = {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {[key: string]: MediaSize},
    image_meta: {[key: string]: any}
}

export type MediaSize = {
    file: string;
    width: number;
    height: number;
    filesize: number;
    mime_type: string;
    source_url: string;
}