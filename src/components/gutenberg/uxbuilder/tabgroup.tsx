'use client';

import { useState } from "react";
import { type Element } from "@/lib/wordpress/types";
import clsx from "clsx";

export function TabgroupElement({
    options,
    child,
    children
}: {
    options: { [key: string]: any };
    child: Element[] | undefined;
    children: React.ReactNode
}) {
    const [visit, setVisit] = useState(0);

    const title = options?.title ?? "title";
    const style = options?.style ?? "line";
    const align = options?.align ?? "left";
    const type = options?.type ?? "";
    const navStyle = options?.navStyle ?? "uppercase";
    const navSize = options?.navSize ?? "normal";
    const event = options?.event ?? "";
    const classOption = options?.class ?? "";
    const visibility = options?.visibility ?? "";

    let justifyClass = "justify-content-start";
    switch (align) {
        case "center":
            justifyClass = "justify-content-center";
            break;
        case "right":
            justifyClass = "justify-content-end";
            break;
    }

    let fontSizeClass = "";
    switch (navSize) {
        case "xsmall":
            fontSizeClass = "text-[0.65em]";
            break;
        case "small":
            fontSizeClass = "text-[0.7em]";
            break;
        case "large":
            fontSizeClass = "text-[1em]";
            break;
        case "xlarge":
            fontSizeClass = "text-[1.1em]";
            break;
    }


    let styleLinkClassName = "";
    let styleLinkActiveClassName = "";

    switch (style) {
        case "tabs":
            styleLinkClassName = "bg-light text-secondary border-l border-r border-t-2 px-3";
            styleLinkActiveClassName = "bg-white border-t-pink-600";
            break;
        case "outline":
            styleLinkClassName = "border-2 text-secondary border-transparent px-[8px] py-[5px] rounded-[32px] leading-[3]";
            styleLinkActiveClassName = "border-2 border-pink-600 !text-pink-600";
    }

    const data = child?.filter((e) => e.tag === "tab") ?? [];

    if (data.length < 1) {
        return undefined;
    }

    return (
        <div
            className={clsx("d-flex flex-wrap", {
                [classOption]: classOption.trim() !== "",
                [visibility]: visibility !== "",
            })}
        >
            {title.trim() !== "" && (
                <h4 className="w-100 uppercase fw-semibold fs-4 text-center" style={{ marginBottom: "0.5em", color: "#000055" }}>
                    {title}
                </h4>
            )}

            <ul className={clsx(
                "position-relative w-100 d-flex flex-wrap align-items-center",
                {
                    "uppercase": navStyle === "uppercase",
                    [fontSizeClass]: fontSizeClass !== "",
                    [justifyClass]: true,
                }
            )}>
                {data.map((e, i: number) => {
                    return (
                        <li
                            key={i}
                            className={clsx(
                                "d-inline position-relative mb-[-1px] ml-[0.1em] mr-[0.1em] first:!ml-0 last:!mr-0"
                            )}
                            style={{
                                transition: "background-color .3s"
                            }}
                        >
                            <a
                                className={clsx(
                                    "inline-flex flex-wrap align-items-center py-[10px]",
                                    {
                                        [styleLinkClassName]: true,
                                        [styleLinkActiveClassName]: i === visit
                                    }
                                )}
                                style={{
                                    transition: "all .2s"
                                }}
                                onMouseEnter={event === "hover" ? (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (i !== visit) {
                                        setVisit(i);
                                    }
                                } : undefined}
                                onClick={event !== "hover" ? (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (i !== visit) {
                                        setVisit(i);
                                    }
                                } : undefined}
                            >
                                <span>{e?.options?.title ?? ""}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
            <div className="w-100 p-4">
                {data.map((e, i) => {
                    return (
                        <div
                            key={i}
                            className={clsx({
                                "d-block": i === visit,
                                "d-block h-0 opacity-0 overflow-hidden invisible": i !== visit,
                            })}
                        >
                            {Array.isArray(children) && children[i]}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export function TabElement({ children } : { children: React.ReactNode }) {
    return children
}