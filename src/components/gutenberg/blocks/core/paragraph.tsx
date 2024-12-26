import { Block } from "@/lib/wordpress/types";

import { parse } from '@/components/gutenberg/uxbuilder/libs/himalaya';
import { renderHtml } from '@/components/gutenberg/uxbuilder/html';

export default function ParagraphCoreElement({ block }: { block: Block }) {
    const json = parse(block.innerHTML);
    return renderHtml(json);
}