'use server'

import { cookies } from 'next/headers';

import { getProducts as getProductsApi } from '@/lib/wordpress';
import { Product } from '@/lib/wordpress/types';
import { ApiError } from '@/lib/type-guards';

import { CURRENCY_PARAM } from '@/utlis/currency';

export async function getProducts(ids: number[]): Promise<Product[] | ApiError> {
    const cookieStore = cookies();

    const lang = cookieStore.get('lang')?.value;
    const currency = cookieStore.get('currency')?.value;

    return await getProductsApi({
        include: ids,
        status: 'publish',
        ...(!!lang && {lang: lang}),
        ...(!!currency && {[CURRENCY_PARAM]: currency}),
    });
}