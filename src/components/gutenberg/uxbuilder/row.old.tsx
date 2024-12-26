import { classnames } from "@/utlis/classnames";
import type { StyleType } from "./definitions";
import { randomGeneralKey, convertStyleToString, getValueReponsiveWithKey, KEY_MIN_MEDIUM_MEDIA_CSS, KEY_MIN_LARGE_MEDIA_CSS } from "./definitions";

export function RowElement({
    options,
    children,
}: {
    options: { [key: string]: any };
    children: React.ReactNode;
}) {
    const key = "row-" + randomGeneralKey().toString();

    const style = options?.style ?? '';
    const colStyle = options?.colStyle ?? '';
    const colBg = options?.colBg ?? '';
    const colBgRadius = options?.colBgRadius ?? '';
    const width = options?.width ?? '';
    const customWidth = options?.customWidth ?? '';
    const vAlign = options?.vAlign ?? '';
    const hAlign = options?.hAlign ?? '';
    const depth = options?.depth ?? 0;
    const depthHover = options?.depthHover ?? 0;
    const classOption = options?.class ?? '';
    const visibility = options?.visibility ?? '';
    const responsive = options?.["$responsive"] ?? "";

    const padding = getValueReponsiveWithKey("padding", responsive, "default");
    const mediumPadding = getValueReponsiveWithKey("padding", responsive, "medium");
    const largePadding = getValueReponsiveWithKey("padding", responsive, "large");

    var styleCss: StyleType = {};
    
    const checkPadding: boolean = !!padding;
    const checkColBg: boolean = colBg !== "";
    const checkColBgRadius: boolean =  colBgRadius !== "" && colBgRadius !== 0 && colBgRadius !== "0";

    if (checkPadding || checkColBg || checkColBgRadius) {
        styleCss[`#${key} > .col > .col-inner`] = {
            ...(checkPadding && { padding: padding }),
            ...(checkColBg && { "background-color": colBg }),
            ...(checkColBgRadius && { "border-radius": `${colBgRadius}px` }),
        };
    }

    const checkMdPadding: boolean = !!mediumPadding;

    if (checkMdPadding) {
        styleCss[KEY_MIN_MEDIUM_MEDIA_CSS] = {
            [`#${key} > .col > .col-inner`]: {
                padding: mediumPadding,
            }
        }
    }

    const checkLgPadding: boolean = !!largePadding;
    if (checkLgPadding) {
        styleCss[KEY_MIN_LARGE_MEDIA_CSS] = {
            [`#${key} > .col > .col-inner`]: {
                padding: largePadding,
            }
        }
    }

    var styleContainer: React.CSSProperties  = {};

    if (width === "custom") {
        styleContainer.maxWidth = customWidth;
    }

    return (
        <div
            id={key}
            className={classnames(
                "row",
                {
                    [`row-${style}`]: style !== "small",
                    [`row-${colStyle}`]: colStyle !== "",
                    [`row-${width}`]: width === "full-width",
                    [`align-${vAlign}`]: vAlign !== "",
                    [`align-${hAlign}`]: hAlign !== "",
                    [`row-box-shadow-${depth}`]: depth !== "" && depth !== "0" && depth !== 0,
                    [`row-box-shadow-${depthHover}-hover`]: depthHover !== "" || depthHover !== "0" && depthHover !== 0,
                    [visibility]: visibility !== "" ,
                    ...(classOption !== "" && {[classOption]: true})
                }
            )}
            style={styleContainer}
        >
            {children}
            {Object.keys(styleCss).length > 0 && (
                <style dangerouslySetInnerHTML={{__html: convertStyleToString(styleCss, '')}}/>
            )}
        </div>
    );
}
