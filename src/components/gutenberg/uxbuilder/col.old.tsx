import { classnames } from "@/utlis/classnames";
import { randomGeneralKey, StyleType, KEY_MAX_MEDIUM_MEDIA_CSS, KEY_MAX_SMALL_MEDIA_CSS, convertStyleToString, getValueReponsiveWithKey } from "./definitions";

export function ColGridElement({
    options,
    children,
}: {
    options: { [key: string]: any };
    children: React.ReactNode;
}) {

    const height = options?.height ?? '';
    const animate = options?.animate ?? '';
    const depth = options?.depth ?? '';
    const depthHover = options?.depthHover ?? '';
    const classOption = options?.class ?? '';
    const visibility = options?.visibility ?? '';
    const responsive = options?.["$responsive"] ?? "";

    const smallSpan = getValueReponsiveWithKey("span", responsive, "default");
    const mediumSpan = getValueReponsiveWithKey("span", responsive, "medium");
    const largeSpan = getValueReponsiveWithKey("span", responsive, "large");
    
    let styleCss: StyleType = {};
    
    if (!!height && !isNaN(Number(height))) {
       
    }

    // if (!!mediumHeight && !isNaN(Number(mediumHeight))) {
        
    // }

    // if (!!smallHeight && !isNaN(Number(smallHeight))) {
        
    // }

    // normal
    return (
        <div
            className={classnames(
                "col grid-col large-9",
                {
                    [`grid-col-${height}`]: height !== "",
                    [visibility]: visibility !== "" ,
                    ...(classOption !== "" && {[classOption]: true}),
                }
            )}
            style={{
                position: "absolute",
                left: "0px",
                top: "0px",
            }}
        >
            <div className="col-inner">
                {children}
            </div>
            
            {Object.keys(styleCss).length > 0 && (
                <style dangerouslySetInnerHTML={{__html: convertStyleToString(styleCss, '')}}/>
            )}
        </div>
    );
}