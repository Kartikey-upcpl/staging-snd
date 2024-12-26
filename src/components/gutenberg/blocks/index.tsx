import type { Block } from "@/lib/wordpress/types";
import {
    ParagraphCoreElement,
    HeadingCoreElement,
    HtmlCoreElement,
    ImageCoreElement,
} from "./core";

function RenderBlock({ block }: { block: Block }) {
    switch (block.blockName) {
        case "core/paragraph":
            return <ParagraphCoreElement block={block}/>;
        case "core/heading":
            return <HeadingCoreElement block={block}/>;
        case "core/html":
            return <HtmlCoreElement block={block}/>
        case "core/image":
            return <ImageCoreElement block={block}/>
        default:
            return null;
    }
}

export default function BlocksBuilder({ blocks }: { blocks: Block[] }) {
    return blocks.map((block, index) => (
        <RenderBlock key={index} block={block} />
    ));
}