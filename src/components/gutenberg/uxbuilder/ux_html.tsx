import { Suspense } from 'react';
import { BlockElement, BlockElementShimmer } from './block';
import { parse } from './libs/himalaya';
import { renderHtml } from './html';
import { formatHtml } from './definitions';

import CustomVideoSection from '../custom_block/video_section';

export function UxHtml({ html, options }: { html: string, options: { [key: string]: any }; }) {

    // Parse HTML has block [block id="pc_cradle_slider"]
    const matches = html.match(/\[block id="([^"]+)"\]/);

    if (matches) {
        const blockId = matches[1];
        return (
            <Suspense fallback={<BlockElementShimmer id={blockId} />}><BlockElement id={blockId} /></Suspense>
        );
    }
    
    // Parse HTML has block [block id="pc_cradle_slider"]
    const videoMatches = html.includes("[shoppable_video_section repeater=\"loop_videos_repeater\"");

    if (videoMatches) {
        return <CustomVideoSection />
    }

    html = html.replaceAll("alt ", 'alt="');
    html = html.replaceAll("[my_offer_boxes]", ""); // clear shortcode my_offer_boxes

    const json = parse(formatHtml(html));

    return renderHtml(json);
}