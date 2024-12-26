import React from "react";
import { Block, type Element } from "@/lib/wordpress/types";
import { UxHtml } from "./ux_html";
import { RootElement } from "./root";
import { RowElement } from "./row";
import { ColElement } from "./col";
import { SectionElement } from "./section";
import { UxBannerGridElement } from "./ux_banner_grid";
import { Gap } from "./gap";
import { UxProducts } from "./ux_products";
import { Button } from "./button";
import { UxSliderElement } from "./ux_slider";
import { TitleElement } from "./title";
import { TextElement } from "./text";
import { BlogPostsElement } from "./blog_posts";
import { UxImageElement } from "./ux_image";
import { UxStackElement } from "./ux_stack";
import { TabgroupElement, TabElement } from "./tabgroup";
import { UxProductCategories } from "./ux_product_categories";

const tagsUndefinedHidden: string[] = ["row", "col", "section", 'ux_slider', 'ux_products', 'blog_posts'];

function renderChildrens(children: Element[]): JSX.Element[] {
    return children
        .reduce((results: JSX.Element[], item: Element, index) => {
            const visibility = item.options?.visibility ?? "";
            if (visibility === "hidden" && tagsUndefinedHidden.includes(item.tag)) {
                return results;
            }
            return [...results, <ElementWidget key={index} element={item} />];
        }, [] as JSX.Element[]);
}

export function ElementWidget({ element }: { element: Element }) {
    switch (element.tag) {
        case "_root":
            return (
                <RootElement>{renderChildrens(element?.children ?? [])}</RootElement>
            );
        case "row":
            return (
                <RowElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </RowElement>
            );
        case "col":
            return (
                <ColElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </ColElement>
            );
        case "section":
            return (
                <SectionElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </SectionElement>
            );
        case "ux_banner_grid":
            return (
                <UxBannerGridElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </UxBannerGridElement>
            );
        case "ux_html":
            return <UxHtml options={element.options} html={element.content ?? ""} />;
        case "ux_slider":
            return (
                <UxSliderElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </UxSliderElement>
            );
        case "gap":
            return <Gap options={element.options} />;
        case "ux_products":
            return (
                <UxProducts options={element.options}></UxProducts>
            );
        case "button":
            return <Button options={element.options} />;
        case "title":
            return <TitleElement options={element.options} />;
        case "text":
            return (
                <TextElement
                    options={element.options}
                    content={element.content ?? ""}
                />
            );
        case "ux_image":
            return <UxImageElement options={element.options} />;
        case "blog_posts":
            return (
                <BlogPostsElement options={element.options} />
            );
        case "ux_stack":
            return (
                <UxStackElement options={element.options}>
                    {renderChildrens(element?.children ?? [])}
                </UxStackElement>
            );
        case "tabgroup":
            return (
                <TabgroupElement options={element.options} child={element.children} >
                    {renderChildrens(element?.children ?? [])}
                </TabgroupElement>
            );
        case "tab":
            return (
                <TabElement>{renderChildrens(element?.children ?? [])}</TabElement>
            );
        case "ux_product_categories":
            return (
                <UxProductCategories options={element.options} />
            );
        default:
            return <div>Flatsome [{element.tag}]: Not implementation yet.</div>;
    }
}

export default function UxBuilder({ element }: { element: Element }) {
    return <ElementWidget element={element} />;
}