import { wordpressClient } from '@/lib/wordpress/http';
import { isWordpressError } from '@/lib/type-guards';

import type { AppBuilderSetting } from '@/lib/wordpress/types/app_builder_type';
import type { ApiError  } from '@/lib/type-guards';
import { TAGS } from '@/lib/constants';

/**
 * Get App Builder settings.
 * 
 * @param {string} lang - The language to get the addresses for.
 * @returns {Promise<AppBuilderSetting | ApiError>} A promise that resolves to the App Builder settings.
 */
export async function getSettings(lang: string) : Promise<AppBuilderSetting | ApiError> {

    const res = await wordpressClient({
        endpoint: "/app-builder/v1/settings",
        query: {
            lang: lang
        },
        tags: [TAGS.settings],
    });
    
    if (isWordpressError(res)) {
        return {
            message: res.message,
            status: res.data.status,
        }
    }

    let data = await res.json();

    return data;
}