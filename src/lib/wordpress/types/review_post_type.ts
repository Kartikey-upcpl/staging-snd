import { AvatarUrl } from "./image_type";
import { PostTitle } from "./post_type";

export type ReviewPostType = {
    id: number;
    author: number;
    author_email: string;
    author_name: string;
    author_url: string;
    content: PostTitle,
    date: string,
    parent: number,
    post: number,
    status: string,
    type: string,
    post_data: {[key: string]: any},
    author_avatar_urls: AvatarUrl,
    _links: {[key: string]: any},
}

export type CreatePostReviewPayload = {
    content: string;
    post: number;
    parent: number;
};

export type WPPostReviewPagination = {
    data: ReviewPostType[];
    totalItem: number,
    totalPage: number,
};