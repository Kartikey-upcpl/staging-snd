import { AvatarUrl } from "./image_type";

export type WpUser = {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls?: AvatarUrl;
    count_posts: number;
};
