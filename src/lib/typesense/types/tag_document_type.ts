import { Tag } from '@/lib/wordpress/types/tag_type';
import { Brand } from '@/lib/wordpress/types/brand_type';

export type TagDocument = Omit<Tag, 'id'> & {
    id: string;
    rowID: number;
};

export type BrandDocument = Omit<Brand, 'id'> & {
    id: string;
    rowID: number;
}