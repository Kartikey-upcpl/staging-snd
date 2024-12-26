import * as cheerio from 'cheerio';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import get from 'lodash/get';

export const KEY_MIN_MEDIUM_MEDIA_CSS: string = `@media (min-width:550px)`;
export const KEY_MIN_LARGE_MEDIA_CSS: string = `@media (min-width:850px)`;

export const KEY_MAX_MEDIUM_MEDIA_CSS: string = `@media (max-width:850px)`;
export const KEY_MAX_SMALL_MEDIA_CSS: string = `@media (max-width:550px)`;

export type StyleType = {
    [key: string]: string | StyleType
}

export type RuleStyleType = {
    selector: string;
    property: string,
    important?: boolean,
    unit?: string,
}

export type BreakpointType = {
    width: number;
    title: string,
    icon: string,
}

type BreakpointRuleType = BreakpointType & {
    rules: {[key: string]: string[]}
}

type DeclarationType = {
    property: string;
    value: string,
    size: string,
}

const BREAKPOINTS: {[key: string]: BreakpointType} = {
    sm: {
        width: 550,
        title: "Mobile",
        icon: "dashicons dashicons-smartphone"
    },
    md: {
        width: 850,
        title: "Tablet",
        icon: "dashicons dashicons-tablet"
    },
    lg: {
        width: 1000,
        title: "Desktop",
        icon: "dashicons dashicons-desktop"
    },
}

const DEFAULT_BREAKPOINT: number = 2;

export function randomGeneralKey(length?: number): number {
    return Math.floor(Math.random() * Math.pow(10, length ?? 9));
}

export function convertStyleToString(data: StyleType, separator: string) {
    if (Object.keys(data).length > 0) {
        var value = "";

        for (const key of Object.keys(data)) {
            if (typeof data[key] === "string") {
                if (data[key] !== "") {
                    value = value + separator + `${key}: ${data[key]};\n`;
                }
            } else {
                if (Object.keys(data[key]).length > 0) {
                    value = value + separator + `${key} {\n${convertStyleToString(data[key], `${separator}\t`)}` + separator + `}\n`;
                }
            }
        }

        return value;
    }

    return "";
}


export function getValueReponsiveWithKey(key: string, reponsives: { [key: string]: any; }, type: "default" | "medium" | "large") {
    const options = Array.isArray(reponsives[key]) ? reponsives[key] : [];

    if (options.length === 3) {
        const value = options.find(o => o !== null);
        const valueMd = options[1];
        const valueLg = options[2];

        switch (type) {
            case "medium":
                if (valueMd && valueMd !== value) {
                    return valueMd;
                }
                return null;
            case "large":
                if (valueLg && valueLg !== (valueMd ?? value)) {
                    return valueLg;
                }
                return null;

        }

        return value;
    }

    return null;
}

/**
 * 
 * Get the class name for the column
 * 
 * @param options 
 * @param type 
 * @returns string | null The class name for the column
 */
export function getColumnClass(options: [string, null][], type: "small" | "medium" | "large"): string | null {

    if (options.length === 3) {
        const valueSm = options[0];
        const valueMd = options[1];
        const valueLg = options[2];

        switch (type) {
            case "medium":
                if (valueMd) {
                    return `col-md-${valueMd}`;
                }
                return null;
            case "large":
                if (valueLg) {
                    return `col-lg-${valueLg}`;
                }
                return null;
            case "small":
                if (valueSm) {
                    return `col-sm-${valueSm}`;
                }
                return null;
        }
    }

    return null;
}

export function getValueReponsiveForStyleCss(key: string, reponsives: { [key: string]: any; }, visit: "default" | "second" | "third", typeMedia?: "min" | "max") {
    const options = Array.isArray(reponsives[key]) ? reponsives[key] : [];

    if (options.length === 3) {
        if (typeMedia === "max") {
            const value = options.findLast(o => o !== null);
            const valueSecond = options[1];
            const valueThird = options[0];

            switch (visit) {
                case "second":
                    if (valueSecond && valueSecond !== value) {
                        return valueSecond;
                    }
                    return null;
                case "third":
                    if (valueThird && valueThird !== (valueSecond ?? value)) {
                        return valueThird;
                    }
                    return null;

            }

            return value;
        }

        const value = options.find(o => o !== null);
        const valueSecond = options[1];
        const valueThird = options[2];

        switch (visit) {
            case "second":
                if (valueSecond && valueSecond !== value) {
                    return valueSecond;
                }
                return null;
            case "third":
                if (valueThird && valueThird !== (valueSecond ?? value)) {
                    return valueThird;
                }
                return null;

        }

        return value;
    }

    return null;
}


/**
 * Format correct htmls
 * @param html 
 * @returns 
 */
export function formatHtml(html: string): string {
    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // // Find all <img> tags
    // $('img').each((index, element) => {
    //     const src = $(element).attr('src');
    //     if (src && !/^["'].*["']$/.test(src)) {
    //         // Wrap src attribute value with quotes if not already quoted
    //         $(element).attr('src', `"${src}"`);
    //     }
    // });
    const head = $('head').html() ?? "";
    if (head.trim().length > 0 ) {
        
        // Add a <style> tag within the <body>
        $('body').prepend(head);
    }
    
    // Serialize the HTML back to a string
    return $("body").html() ?? "";
}

/**
 * Collect all responsive values from an object with options.
 * @param param_name
 * @param options
 * @return object
 */
function getResponsiveValues(paramName: string, values: { [key: string]: any }): (string | null)[] {

    if (has(values, ['$responsive', paramName])) {
        return get(values, ['$responsive', paramName]);
    }

    // Prepare values and set default value.
    let responsiveValues: (string | null)[] = new Array(Object.keys(BREAKPOINTS).length).fill(null);
    responsiveValues[DEFAULT_BREAKPOINT] = values[paramName];

    return responsiveValues;
}

function processBreakpointValues(values: (string | null)[]): (string | null)[] {
    for (let i = values.length - 1; i > 0; i--) {
        if (!values[i - 1] && values[i - 1] !== '0') {
            values[i - 1] = values[i];
            values.splice(i, 1); // Remove the element at index i
        }
    }
    return values;
}

function getCssDeclaration(declaration: DeclarationType): DeclarationType {
    switch(declaration.property) {
        case "background-image":
            if (!isNaN(parseFloat(declaration.value)) && isFinite(parseFloat(declaration.value))) {
                // const value = "";
                // if (value !== ) {
                //     declaration.value = `url(${value})`;
                // }
            } else {
                if (declaration.value) {
                    declaration.value = `url(${declaration.value})`;
                }
            }
            break;
        case "rotate":
            declaration.property = 'transform';
            declaration.value = `rotate(${declaration.value})`;
            break;
    }
    return declaration;
}

export function getStyleTag(id: string, rules: {[key: string]: RuleStyleType}, options: { [key: string]: any }): string {
    // Just return here if no attributes are set.
    if (isEmpty(options)) return '';

    // Prepare breakpoints.
    const styles: BreakpointRuleType[] = Object.entries(BREAKPOINTS).reduce((styles: any[], breakpoint) => {
        styles.push({
            ...breakpoint[1],
            "rules": {},
        });
        return styles;
    }, []);


    for (const [paramName, rule] of Object.entries(rules)) {
        if (!has(options, paramName)) continue;
        const values: (string | null)[] = getResponsiveValues(paramName, options);
        const breakpointValues: (string | null)[] = processBreakpointValues(values);

        for(let i = 0; i < breakpointValues.length; i++) {
            let value = breakpointValues[i];
            if (value === null || String(value) === '') continue;

            const unit: string = rule?.unit ?? "";
            const selectors: string[] = rule.selector.split(',').map((s: string) => s.trim());
            const properties: string[] = rule.property.split(',').map((s: string) => s.trim());
            const size = get(rule, "size", "");

            for(const selector of selectors) {
                const selector_str = `#${id} ${selector}`.trim();
                for(const property of properties) {
                    if (isEmpty(property)) continue;
                    if (rule.unit) {
                        value = parseFloat(value) + unit;
                    }
                    let declaration: DeclarationType = getCssDeclaration({
                        property: property,
                        value: value,
                        size: size,
                    });
                    if (declaration.value || declaration.value === '0') {
                        if (rule.important === true) {
                            declaration.value = declaration.value + "!important";
                        }

                        const declaration_str = `${declaration.property}: ${declaration.value};`.trim();
                        if (styles[i]) {
                            if (!styles[i].rules[selector_str]) {
                                styles[i].rules[selector_str] = [];
                            }
                            styles[i].rules[selector_str].push(declaration_str);
                        }
                    }
                }
            }
        }
    }

    let output = "";
    for(let i = 0; i < styles.length; i ++) {
        const media = styles[i];

        if (Object.keys(media.rules).length > 0) {
            if (i > 0) {
                output = output + `@media (min-width:${styles[i - 1].width}px) {\n`;
            }

            for (const [selector, declarations] of Object.entries(media.rules)) {
                const indent = ' '.repeat(i > 0 ? 2 : 0);
                output += `${indent}${selector} {\n${indent}  ${declarations.join(`\n${indent}  `)}\n${indent}}\n`;
            }
            if (i > i) {
                output = output + "}\n";
            }
        }
    }

    const trimmed_output = output.trim();

    if (trimmed_output.length > 0) {
        return trimmed_output.replace(/<\/?[^>]+(>|$)/g, '');
    }
    return "";
}