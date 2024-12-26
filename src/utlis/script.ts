/**
 * Load a script from a given source.
 * 
 * @param {string} src - The source of the script to load.
 * @returns {Promise<boolean>} A promise that resolves to true if the script was loaded successfully, false otherwise.
 */
export function loadScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export function removeScript(src: string) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === src) {
            scripts[i].parentNode?.removeChild(scripts[i]);
        }
    }
}