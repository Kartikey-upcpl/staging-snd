
/**
 * Generates a unique string using the current timestamp and random characters.
 * @returns {string} A unique string.
 */
export function uuid(): string {
    const timestamp = Date.now().toString(36); // Convert current timestamp to a base-36 string
    const randomChars = Math.random().toString(36).substring(2, 10); // Generate random characters
    return `${timestamp}-${randomChars}`;
}