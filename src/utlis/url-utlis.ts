const wordpressUrl = process.env.WORDPRESS_URL!;
const wordpressConsumerKey = process.env.WORDPRESS_CONSUMER_KEY!;
const wordpressConsumerSecret = process.env.WORDPRESS_CONSUMER_SECRET!;

const allowPathAuthenticationRestApiKeys = ['/wc/v3/', '/wc/v2/', '/wc-appointments/v1/']

/// Check Path wordpress URLs allow pass consumer key & secret
/**
 * Check Path wordpress URLs allow pass consumer key & secret
 * @param apiPath - Path of url.
 * @returns boolean.
 */
function isAllowPassRestApiKeys(apiPath: string) {
    var allow: boolean = false;
  
    for (const path of allowPathAuthenticationRestApiKeys) {
      if (apiPath.indexOf(path) == 0) {
        allow = true;
        break;
      }
    }
  
    return allow;
}

/**
 * Extracts the path from a given URL.
 * @param url - The URL from which to extract the path.
 * @returns The path of the URL.
 */
export function getPathFromUrl(url: string): string {
    const urlObj = new URL(url);
    return urlObj.pathname;
}

/**
 * Pre worpress url .
 * @param path - Path of url.
 * @param queryParams - Data of query params of url.
 * @returns The string URL.
 */

export function preUrlWordpress(path: string, queryParams: {[key: string]: any}) : string {
    var query: {} = {
        ...queryParams,
    }

    if (isAllowPassRestApiKeys(path)) {
        query = {
            ...query,
            consumer_key: wordpressConsumerKey,
            consumer_secret: wordpressConsumerSecret,
        }
    }
    const params = new URLSearchParams(query);

    return `${wordpressUrl}/wp-json${path}?${params.toString()}`;
}