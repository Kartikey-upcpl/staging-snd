export type ImageReviewType = {
    thumb: string;
}

export type ReviewCommentType = {
    id: number;
    date_created: string;
    dateCreatedGmt: string;
    product_id: number;
    status: string;
    reviewer: string;
    reviewer_email: string;
    review: string,
    rating: number,
    verified: boolean,
    reviewer_avatar_urls: { [key: string]: string },
    reviews_images?: ImageReviewType[] | undefined,
}

export type CreateRewviewPayload = {
    product_id: number;
    review: string;
    reviewer: string;
    reviewer_email: string;
    rating: number;
};