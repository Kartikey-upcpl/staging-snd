import { classnames } from "@/utlis/classnames";
import type { StyleType } from "./definitions";
import { randomGeneralKey, convertStyleToString, getValueReponsiveWithKey, KEY_MIN_MEDIUM_MEDIA_CSS, KEY_MIN_LARGE_MEDIA_CSS } from "./definitions";
import clsx from "clsx";

function getAlignVertical(vAlign: string) {
    switch(vAlign) {
        case "middle":
            return "items-center align-middle";
        case "bottom":
            return "items-end align-bottom"
        default:
            return "";
    }
}

function getAlignHorizontal(vAlign: string) {
    switch(vAlign) {
        case "center":
            return "justify-center";
        case "right":
            return "justify-end"
        default:
            return "";
    }
}

export function RowElement({
    options,
    children,
}: {
    options: { [key: string]: any };
    children: React.ReactNode;
}) {

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

    const verticalClass = getAlignVertical(vAlign);
    const horizontalClass = getAlignHorizontal(hAlign);
    
    if (style === 'collapse') {
        return (
            <div className="container">
                <div
                    className={clsx(['row', verticalClass, horizontalClass])}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            className={clsx(["row", verticalClass, horizontalClass])}
        >
            {children}
        </div>
    );
}
