import { ReadonlyURLSearchParams } from 'next/navigation';
import { Product } from './typesense/typesense_type';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
    stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
    const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
    const missingEnvironmentVariables = [] as string[];

    requiredEnvironmentVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            missingEnvironmentVariables.push(envVar);
        }
    });

    if (missingEnvironmentVariables.length) {
        throw new Error(
            `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
                '\n'
            )}\n`
        );
    }

    if (
        process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
        process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
    ) {
        throw new Error(
            'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
        );
    }
};

export const priceProduct = (product: Product, type: string) => {
    const price = parseInt(
        type === 'regular_price'
            ? product.prices.regular_price
            : type === 'sale_prce'
                ? product.prices.sale_price
                : product.prices.price
    );

    const unit = product.prices.currency_minor_unit;

    const powUnit = unit > 0 ? Math.pow(10, unit) : 1;

    return `${price / powUnit}`;
};

/**
 * Checks if a given URL is valid.
 * 
 * @param url - The URL to be checked.
 * @returns A boolean indicating whether the URL is valid or not.
 */
export function isValidUrl(url: string | undefined | null): boolean {
    if (!url || url === '') {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}


/**
 * Checks if a given text is a valid JSON.
 * 
 * @param {string} text - The text to be checked.
 * @returns {boolean} - Returns true if the text is a valid JSON, otherwise returns false.
 */
export function isValidJSON(text: string) {
    try {
        JSON.parse(text);
        return true;
    } catch {
        return false;
    }
}