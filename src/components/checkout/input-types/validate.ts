import type { InputProps } from "./types";

type PostcodePatterns = { [key: string]: RegExp };
type ValidateTypeResult = string | undefined;
type EmailPropsType = string | undefined;
type PhonePropsType = string | undefined;
type PostcodePropsType = { postcode: string | undefined, countryCode: string | undefined };
type PropsValidateType = EmailPropsType | PostcodePropsType;

const postcodePatterns: PostcodePatterns = {
    'US': /^\d{5}(-\d{4})?$/,                       // USA (ZIP code: 5 digits or 5+4 digits)
    'UK': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,    // United Kingdom (Postcode: e.g., SW1A 1AA)
    'CA': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,              // Canada (e.g., K1A 0B1)
    'DE': /^\d{5}$/,                                // Germany (5 digits)
    'FR': /^\d{5}$/,                                // France (5 digits)
    'AU': /^\d{4}$/,                                // Australia (4 digits)
    'IT': /^\d{5}$/,                                // Italy (5 digits)
    'ES': /^\d{5}$/,                                // Spain (5 digits)
    'NL': /^\d{4} ?[A-Z]{2}$/,                      // Netherlands (e.g., 1234 AB)
    'BR': /^\d{5}-\d{3}$/,                          // Brazil (e.g., 12345-678)
    'RU': /^\d{6}$/,                                // Russia (6 digits)
    'IN': /^\d{6}$/,                                // India (6 digits)
    'JP': /^\d{3}-\d{4}$/,                          // Japan (e.g., 123-4567)
    'CN': /^\d{6}$/,                                // China (6 digits)
    'MX': /^\d{5}$/,                                // Mexico (5 digits)
    'CH': /^\d{4}$/,                                // Switzerland (4 digits)
    'SE': /^\d{3} ?\d{2}$/,                         // Sweden (e.g., 123 45)
    'BE': /^\d{4}$/,                                // Belgium (4 digits)
    'AR': /^([A-HJ-NP-Z])?\d{4}([A-Z]{3})?$/,       // Argentina (e.g., C1234ABC)
    'DK': /^\d{4}$/,                                // Denmark (4 digits)
    'FI': /^\d{5}$/,                                // Finland (5 digits)
    'NO': /^\d{4}$/,                                // Norway (4 digits)
    'NZ': /^\d{4}$/,                                // New Zealand (4 digits)
    'IE': /^[A-Z]\d{2} ?[A-Z\d]{4}$/,               // Ireland (e.g., A12 B34C)
    'PL': /^\d{2}-\d{3}$/,                          // Poland (e.g., 12-345)
    'PT': /^\d{4}-\d{3}$/,                          // Portugal (e.g., 1234-567)
    'ZA': /^\d{4}$/,                                // South Africa (4 digits)
    'KR': /^\d{5}$/,                                // South Korea (5 digits)
    'GR': /^\d{3} ?\d{2}$/,                         // Greece (5 digits)
    'IL': /^\d{5}$/,                                // Israel (5 digits)
    'SG': /^\d{6}$/,                                // Singapore (6 digits)
    'HK': /^(\d{6})?$/,                             // Hong Kong (6 digits or empty)
    'HU': /^\d{4}$/,                                // Hungary (4 digits)
    'IS': /^\d{3}$/,                                // Iceland (3 digits)
    'AT': /^\d{4}$/,                                // Austria (4 digits)
    'CZ': /^\d{3} ?\d{2}$/,                         // Czech Republic (e.g., 123 45)
    'SK': /^\d{3} ?\d{2}$/,                         // Slovakia (e.g., 123 45)
    'SI': /^\d{4}$/,                                // Slovenia (4 digits)
    'RO': /^\d{6}$/,                                // Romania (6 digits)
    'HR': /^\d{5}$/,                                // Croatia (5 digits)
    'EE': /^\d{5}$/,                                // Estonia (5 digits)
    'LV': /^\d{4}$/,                                // Latvia (4 digits)
    'LT': /^\d{5}$/,                                // Lithuania (5 digits)
    'MT': /^[A-Z]{3} ?\d{4}$/,                      // Malta (e.g., ABC 1234)
    'CY': /^\d{4}$/,                                // Cyprus (4 digits)
    'LU': /^\d{4}$/,                                // Luxembourg (4 digits)
    'BG': /^\d{4}$/,                                // Bulgaria (4 digits)
    'TR': /^\d{5}$/,                                // Turkey (5 digits)
    'MY': /^\d{5}$/,                                // Malaysia (5 digits)
    'TH': /^\d{5}$/,                                // Thailand (5 digits)
    'EG': /^\d{5}$/,                                // Egypt (5 digits)
    'SA': /^\d{5}$/,                                // Saudi Arabia (5 digits)
    'AE': /^\d{5}$/,                                // United Arab Emirates (5 digits)
    'QA': /^\d{5}$/,                                // Qatar (5 digits)
};

/**
 * Validate a string input
 * 
 * @param {EmailPropsType} props The value to validate
 * @returns {string | undefined} The error message if the value is invalid
 */
export function validateEmail(email: EmailPropsType): ValidateTypeResult {
    if (!email) {
        return 'Email is invalid';
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
        return 'Email is invalid';
    }

    return undefined;
}

/**
 * Validate a string input
 * 
 * @param {EmailPropsType} props The value to validate
 * @returns {string | undefined} The error message if the value is invalid
 */
export function validatePhone(phone: PhonePropsType): ValidateTypeResult {
    if (!phone) {
        return 'Phone is invalid';
    }

    const valid = /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,3}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);

    if (!valid) {
        return 'Phone is invalid';
    }

    return undefined;
}

/**
 * Validate a postcode
 * 
 * @param {string} countryCode The country code to validate postcode for.
 * @param {string | undefined} postcode The postcode to validate
 * @returns {string | undefined} The error message if the postcode is invalid
 */
function validatePostcode(props: PostcodePropsType): ValidateTypeResult {
    if (!props.countryCode) {
        return 'Something went wrong';
    }

    const pattern = postcodePatterns[props.countryCode];
    if (!pattern) {
        return 'Postcode is required';
    }

    if (!props.postcode) {
        return 'Postcode is required';
    }

    const valid = pattern.test(props.postcode);

    if (!valid) {
        return 'Invalid postcode';
    }

    return undefined;
}

/**
 * Validate a string input
 * 
 * @param {string | undefined} value The value to validate
 */
export default function validate(name: string, value: string | undefined, props: InputProps<string>): ValidateTypeResult {
    switch (name) {
        case 'email':
            return validateEmail(value as EmailPropsType);
        case 'postcode':
            return validatePostcode({
                postcode: value,
                countryCode: props.meta.country_selected,
            });
        case 'phone':
            return validatePhone(value as PhonePropsType);
        case 'tel':
                return validatePhone(value as PhonePropsType);    
        case 'required':
            if (value === undefined || value === "") {
                return "Required field.";
            }
            return undefined;
        default:
            return undefined;
    }
}