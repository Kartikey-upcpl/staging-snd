import { classnames } from "@/utlis/classnames";
import { randomGeneralKey, StyleType, KEY_MAX_MEDIUM_MEDIA_CSS, KEY_MAX_SMALL_MEDIA_CSS, convertStyleToString, getValueReponsiveWithKey, getColumnClass } from "./definitions";
import clsx from "clsx";

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
    const responsive = options?.["$responsive"] ?? {};
    const span = options?.span ?? 12;

    const smallSpan = getColumnClass(responsive['span'], "small");
    const mediumSpan = getColumnClass(responsive['span'], "medium");
    const largeSpan = getColumnClass(responsive['span'], "large");

    // if (!!mediumHeight && !isNaN(Number(mediumHeight))) {

    // }

    // if (!!smallHeight && !isNaN(Number(smallHeight))) {

    // }

    // normal
    return (
        <div className={clsx("test-class", [smallSpan, mediumSpan, largeSpan])}>
            {children}
        </div>
    );
}