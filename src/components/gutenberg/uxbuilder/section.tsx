import { classnames } from "@/utlis/classnames";
import type { RuleStyleType } from "./definitions";
import { getStyleTag, randomGeneralKey } from "./definitions";

import { getMedia } from "@/lib/wordpress";
import type { ApiError } from "@/lib/type-guards";
import type { Media } from "@/lib/wordpress/types";

import { BorderComponent } from "../components/border";
import { ParallaxComponent } from "../components/parallax";
import { DividerComponent } from "../components/divider";
import { VideoComponent } from "../components/video";
import { BackgroundComponent } from "../components/background";

export function SectionElement({ options, children }: { options: { [key: string]: any }; children: React.ReactNode }) {
    
    const key = "section-" + randomGeneralKey().toString();

    const bg = options.bg ?? "";
    const bgSize = options?.bgSize ?? "";
    const bgOverlay = options?.bgOverlay ?? "";
    const hover = options?.hover ?? "";
    const hoverAlt = options?.hoverAlt ?? "";
    const parallax = options?.parallax ?? "";
    const effect = options?.effect ?? "";
    const dark = options?.dark ?? "";
    const sticky = options?.sticky ?? "";
    const mask = options?.mask ?? "";
    const scrollForMore = options?.scrollForMore ?? "";
    const loading = options?.loading ?? "";
    const dividerTop = options?.dividerTop ?? "";
    const dividerTopFlip = options?.dividerTopFlip ?? "";
    const dividerTopToFront = options?.dividerTopToFront ?? "";
    const divider = options?.divider ?? "";
    const dividerFlip = options?.dividerFlip ?? "";
    const dividerToFront = options?.dividerToFront ?? "";
    const border = options?.border ?? "";
    const borderMargin = options?.borderMargin ?? "";
    const borderStyle = options?.borderStyle ?? "";
    const borderRadius = options?.borderRadius ?? "";
    const borderColor = options?.borderColor ?? "";
    const borderHover = options?.borderHover ?? "";
    const youtube = options?.youtube ?? "";
    const videoMp4 =  options?.videoMp4 ?? "";
    const videoOgg =  options?.videoOgg ?? "";
    const videoWebm =  options?.videoWebm ?? "";
    const videoSound =  options?.videoSound ?? "";
    const videoLoop =  options?.videoLoop ?? "";
    const videoVisibility =  options?.videoVisibility ?? "";
    const classOption =  options?.class ?? "";
    const visibility =  options?.visibility ?? "";

    const mediaPromise: Promise<Media | ApiError> | undefined= !!bg ? getMedia(bg) : undefined;

    let rules: {[key: string]: RuleStyleType} = {
        padding: {
            selector: "",
            property: 'padding-top, padding-bottom'
        },
        margin: {
            selector: "",
            property: "margin-bottom"
        },
        height: {
            selector: "",
            property: "min-height"
        },
        bgColor: {
            selector: "",
            property: "background-color"
        },
        bgOverlay: {
            selector: ".section-bg-overlay",
            property: "background-color"
        },
        bgPos: {
            selector: ".section-bg img",
            property: "object-position"
        }
    };

    if (dividerTop) {
        rules["dividerTopHeight"] = {
            selector: ".ux-shape-divider--top svg",
            property: "height",
        };

        rules["dividerTopWidth"] = {
            selector: ".ux-shape-divider--top svg",
            property: "--divider-top-width",
            unit: "%",
        }

        rules["dividerTopFill"] = {
            selector: '.ux-shape-divider--top .ux-shape-fill',
            property: "fill",
        }
    }
    
    if (divider) {
        rules["dividerHeight"] = {
            selector: ".ux-shape-divider--bottom svg",
            property: "height"
        }

        rules["dividerWidth"] = {
            selector: ".ux-shape-divider--bottom svg",
            property: "--divider-width"
        }

        rules["dividerFill"] = {
            selector: ".ux-shape-divider--bottom .ux-shape-fill",
            property: "fill"
        }
    }

    const style: string = getStyleTag(key, rules, options);

    return (
        <section
            id={key}
            className={classnames(
                "section flex items-center relative w-full p-[30px 0] min-h-[auto]",
                {
                    "dark": dark === "true",
                    [visibility]: visibility !== "",
                    ...(classOption !== "" && { [classOption]: true }),
                    "sticky-section": sticky === "true",
                    [`has-mask mask-${mask}`]: mask !== "",
                    "has-parallax": parallax !== "" && parallax !== "0" && parallax !== 0,
                }
            )}
        >
            <ParallaxComponent parallax={parallax} type="section" className="section-bg fill absolute inset-0 overflow-hidden">
                <BackgroundComponent
                    mediaPromise={mediaPromise}
                    size={bgSize}
                />
                <VideoComponent
                    youtube={youtube}
                    videoMp4={videoMp4}
                    videoOgg={videoOgg}
                    videoWebm={videoWebm}
                    videoSound={videoSound}
                    videoLoop={videoLoop}
                    videoVisibility={videoVisibility}
                />
                
                {bgOverlay !== "" && (<div className="section-bg-overlay absolute inset-0" />)}
                {scrollForMore === "true" && (<button className="scroll-for-more z-5 icon absolute bottom h-center" aria-label="Scroll for more"><i className="icon-angle-down" style={{fontSize: 42 }}></i></button>)}
                {effect !== "" && <div className={`effect-${effect} bg-effect fill no-click`}/>}
                <BorderComponent
                    border={border}
                    borderMargin={borderMargin}
                    borderStyle={borderStyle}
                    borderRadius={borderRadius}
                    borderColor={borderColor}
                    borderHover={borderHover}
                />
            </ParallaxComponent>
            <DividerComponent direction="top" type={dividerTop} isFlip={dividerTopFlip === "true"} isFront={dividerTopToFront === "true"}/>
            <DividerComponent type={divider} isFlip={dividerFlip === "true"} isFront={dividerToFront === "true"}/>
            <div className="section-content relative w-full">
                {children}
            </div>
            {style.length > 0 && (
                <style dangerouslySetInnerHTML={{ __html: style }} />
            )}
        </section>
    );
}