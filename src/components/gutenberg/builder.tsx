import { Block, Element } from '@/lib/wordpress/types';

import UxBuilder from './uxbuilder';
import BlocksBuilder from './blocks';

import { renderHtml } from '@/components/gutenberg/uxbuilder/html';
import { parse } from '@/components/gutenberg/uxbuilder/libs/himalaya';
import { formatHtml } from '@/components/gutenberg/uxbuilder/definitions';

import "./css/global.css";
import "./css/guten.css";
import "./css/child.css";
import "./css/heading.css";
import "./css/custom.css";
import "./css/effect.css";

type RenderType = 'blocks' | 'html' | 'flatsome_blocks';
const renderType: RenderType = 'flatsome_blocks';

function renderFlatsomeBlocks( element: Element) {
    return (
        <UxBuilder element={element} />
    )
}

export default function Builder({ blocks, contentHtml, flatsomeBlocks }: { blocks: Block[], contentHtml: string, flatsomeBlocks: Element | undefined }) {
    if (renderType === "flatsome_blocks" && flatsomeBlocks) {
        return renderFlatsomeBlocks(flatsomeBlocks);
    }

    if (renderType==="blocks" && blocks.length > 0) {
        return (
            <div className="block-wrapper">
                <BlocksBuilder blocks={blocks} />
            </div>
        );
    }

    const json = parse(formatHtml(contentHtml));

    return (
        <div className="block-wrapper">
            {renderHtml(json)}
        </div>
    );
}