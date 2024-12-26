import { Category } from '@/lib/wordpress/types/category_type';

export type CategoryDocument = Omit<Category, 'id'> & {
    id: string;
    rowID: number;
};