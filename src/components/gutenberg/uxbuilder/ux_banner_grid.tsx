import { classnames } from "@/utlis/classnames";
import { getValueReponsiveForStyleCss, randomGeneralKey, StyleType, KEY_MAX_MEDIUM_MEDIA_CSS, KEY_MAX_SMALL_MEDIA_CSS, convertStyleToString } from "./definitions";

export function UxBannerGridElement({
    options,
    children,
}: {
    options: { [key: string]: any };
    children: React.ReactNode;
}) {
    const key = "banner-grid-" + randomGeneralKey().toString();

    const spacing = options?.spacing ?? '';
    const width = options?.width ?? '';
    const depth = options?.depth ?? '';
    const depthHover = options?.depthHover ?? '';
    const classOption = options?.class ?? '';
    const visibility = options?.visibility ?? '';
    const responsive = options?.["$responsive"] ?? "";

    const height = getValueReponsiveForStyleCss("height", responsive, "default", "max");
    const mediumHeight = getValueReponsiveForStyleCss("height", responsive, "second", "max");
    const smallHeight = getValueReponsiveForStyleCss("height", responsive, "third", "max");
    
    let styleCss: StyleType = {};
    
    if (!!height && !isNaN(Number(height))) {
        const valueHeight = Number(height);

        styleCss[`#${key} .grid-col-1`] = {
            height: `${valueHeight}px`,
        }
        styleCss[`#${key} .grid-col-1-2`] = {
            height: `${valueHeight /2}px`,
        }
        styleCss[`#${key} .grid-col-1-3`] = {
            height: `${valueHeight / 3}px`,
        }
        styleCss[`#${key} .grid-col-2-3`] = {
            height: `${(valueHeight * 2) / 3}px`,
        }
        styleCss[`#${key} .grid-col-1-4`] = {
            height: `${valueHeight / 4}px`,
        }
        styleCss[`#${key} .grid-col-3-4`] = {
            height: `${(valueHeight * 3) / 4}px`,
        }
    }

    if (!!mediumHeight && !isNaN(Number(mediumHeight))) {
        const valueMediumHeight = Number(mediumHeight);

        let styleMedium: StyleType = {};

        styleMedium[`#${key} .grid-col-1`] = {
            height: `${valueMediumHeight}px`,
        }
        styleMedium[`#${key} .grid-col-1-2`] = {
            height: `${valueMediumHeight /2}px`,
        }
        styleMedium[`#${key} .grid-col-1-3`] = {
            height: `${valueMediumHeight / 3}px`,
        }
        styleMedium[`#${key} .grid-col-2-3`] = {
            height: `${(valueMediumHeight * 2) / 3}px`,
        }
        styleMedium[`#${key} .grid-col-1-4`] = {
            height: `${valueMediumHeight / 4}px`,
        }
        styleMedium[`#${key} .grid-col-3-4`] = {
            height: `${(valueMediumHeight * 3) / 4}px`,
        }

        styleCss[KEY_MAX_MEDIUM_MEDIA_CSS] = styleMedium; 
    }

    if (!!smallHeight && !isNaN(Number(smallHeight))) {
        const valueSmallHeight = Number(smallHeight);

        let styleSmall: StyleType = {};

        styleSmall[`#${key} .grid-col-1`] = {
            height: `${valueSmallHeight}px`,
        }
        styleSmall[`#${key} .grid-col-1-2`] = {
            height: `${valueSmallHeight /2}px`,
        }
        styleSmall[`#${key} .grid-col-1-3`] = {
            height: `${valueSmallHeight / 3}px`,
        }
        styleSmall[`#${key} .grid-col-2-3`] = {
            height: `${(valueSmallHeight * 2) / 3}px`,
        }
        styleSmall[`#${key} .grid-col-1-4`] = {
            height: `${valueSmallHeight / 4}px`,
        }
        styleSmall[`#${key} .grid-col-3-4`] = {
            height: `${(valueSmallHeight * 3) / 4}px`,
        }

        styleCss[KEY_MAX_SMALL_MEDIA_CSS] = styleSmall; 
    }

    // normal
    return (
        <div className="banner-grid-wrapper">
            <div
                id={key}
                className={classnames(
                    "banner-grid row row-grid",
                    {
                        [visibility]: visibility !== "" ,
                        ...(classOption !== "" && {[classOption]: true}),
                        [`row-${spacing}`]: spacing !== "" && spacing !== "normal",
                        [`row-box-shadow-${depth}`]: depth && depth !== "0" && depth !== 0,
                        [`row-box-shadow-${depthHover}-hover`]: depthHover && depthHover !== "0" && depthHover !== 0,
                        [`row-${width}`]: width !== "",
                    }
                    
                )}
                data-packery-options
                style={{position: "relative", height: '600px'}}
            >
                {children}      
            </div>
            {Object.keys(styleCss).length > 0 && (
                <style dangerouslySetInnerHTML={{__html: convertStyleToString(styleCss, '')}}/>
            )}
        </div>
    );
}