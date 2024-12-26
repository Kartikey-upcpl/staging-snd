export interface ShopifyErrorLike {
    status: number;
    message: Error;
    cause?: Error;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
    if (!isObject(error)) return false;

    if (error instanceof Error) return true;

    return findError(error);
};

function findError<T extends object>(error: T): boolean {
    if (Object.prototype.toString.call(error) === '[object Error]') {
        return true;
    }

    const prototype = Object.getPrototypeOf(error) as T | null;

    return prototype === null ? false : findError(prototype);
}

// =================================================================================================
//                                               API Error 
// =================================================================================================

/**
 * Represents an API error object.
 */
export type ApiError = {
    status: number;
    message: string;
    cause?: Error;
}

/**
 * Checks if the provided error object is an instance of ApiError.
 * @param error - The error object to be checked.
 * @returns True if the error is an instance of ApiError, false otherwise.
 */
export function isApiError(error: unknown): error is ApiError {
    return isObject(error) &&
        typeof (error as ApiError)?.status === 'number' &&
        typeof (error as ApiError)?.message === 'string';
}

export type ApiResponse<T> = {
    message?: string;
    data?: T;
}

/**
 * Formats the API response.
 * 
 * @param {T | ApiError} res - The response from the API.
 * @returns {ApiResponse<T>} - The ActionResponse to be sent to the component.
 */
export function getApiResponse<T>(res: T | ApiError): ApiResponse<T> {
    if (isApiError(res)) {
        return {
            message: res.message,
        }
    }
    return {
        data: res,
    }
}

// =================================================================================================
//                                               Typesense 
// =================================================================================================

/**
 * Represents a TypeSenseError object.
 */
export type TypeSenseError = {
    status: number;
    message: string;
    pathname: string;
}

/**
 * Checks if the provided error object is an instance of TypeSenseError.
 * 
 * @param error - The error object to be checked.
 * @returns A boolean indicating whether the error object is an instance of TypeSenseError.
 */
export function isTypesenseError(error: unknown): error is TypeSenseError {
    return isObject(error) &&
        typeof (error as TypeSenseError)?.status === 'number' &&
        typeof (error as TypeSenseError)?.message === 'string' &&
        typeof (error as TypeSenseError)?.pathname === 'string';
}

/**
 * Retrieves the TypeSense error from the response.
 * 
 * @param res - The response object.
 * @returns A promise that resolves to a TypeSenseError object.
 */
export async function getTypeSenseError(res: Response): Promise<TypeSenseError> {
    const body = await res.json();

    // Has a message property
    if (body?.message) {
        return {
            status: res.status,
            message: body.message,
            pathname: res.url
        };
    }

    // API errors
    // Typesense API uses standard HTTP response codes to indicate the success or failure of a request.

    // Codes in the 2xx range indicate success, codes in the 4xx range indicate an error given the information provided (e.g. a required parameter was omitted), and codes in the 5xx range indicate an error with the Typesense service itself.

    // Parameter	Required
    // 400	Bad Request - The request could not be understood due to malformed syntax.
    // 401	Unauthorized - Your API key is wrong.
    // 404	Not Found - The requested resource is not found.
    // 409	Conflict - When a resource already exists.
    // 422	Unprocessable Entity - Request is well-formed, but cannot be processed.
    // 503	Service Unavailable - We’re temporarily offline. Please try again later.

    let message = '';
    switch (res.status) {
        case 400:
            message = 'Bad Request - The request could not be understood due to malformed syntax.';
            break;
        case 401:
            message = 'Unauthorized - Your API key is wrong.';
            break;
        case 404:
            message = 'Not Found - The requested resource is not found.';
            break;
        case 409:
            message = 'Conflict - When a resource already exists.';
            break;
        case 422:
            message = 'Unprocessable Entity - Request is well-formed, but cannot be processed.';
            break;
        case 503:
            message = 'Service Unavailable - We\'re temporarily offline. Please try again later.';
            break;
        default:
            message = 'Unknown error';
            break;
    }
    return {
        status: res.status,
        message: message,
        pathname: res.url
    };
}

// =================================================================================================
//                                               WordPress 
// =================================================================================================

/**
 * Represents a WordpressError object.
 */
export type WordpressError = {
    code: string;
    message: string;
    data: {
        status: number;
    };
}


/**
 * Checks if the provided error object is an instance of WordpressError.
 * 
 * @param error - The error object to be checked.
 * @returns A boolean indicating whether the error object is an instance of WordpressError.
 */
export function isWordpressError(error: unknown): error is WordpressError {
    return isObject(error) &&
        typeof (error as WordpressError)?.code === 'string' &&
        typeof (error as WordpressError)?.message === 'string' &&
        typeof (error as WordpressError)?.data?.status === 'number';
}

/**
 * Retrieves the TypeSense error from the response.
 * 
 * @param res - The response object.
 * @returns A promise that resolves to a TypeSenseError object.
 */
export async function getWordpressError(res: Response): Promise<WordpressError> {
    const body = await res.json();
    const message = body?.message ?? 'Unknown error';
    const code = body?.code ?? 'unknown-code';
    const status = body?.data?.status ?? 500;

    return {
        code,
        message,
        data: {
            status
        }
    };
}

// =================================================================================================
//                                               Unknown Error
// =================================================================================================

/**
 * Get error message in try-catch block.
 * 
 * @param error - The error object.
 * 
 * @returns The error message.
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    // Object and has a message property
    if (isObject(error) && 'message' in error) {
        return (error as { message: string }).message;
    }

    // If error is a string
    if (typeof error === 'string') {
        // Try to parse it as JSON
        try {
            const json = JSON.parse(error);
            return getErrorMessage(json);
        } catch {
            return error;
        }
    }

    return 'Unknown error';
}