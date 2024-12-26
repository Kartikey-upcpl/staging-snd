import { use } from 'react';
import { getElementAction } from "@/components/gutenberg/actions";
import { Element as FlatsomeElement } from "@/lib/wordpress/types";
import { ElementWidget } from "@/components/gutenberg/uxbuilder";
import Shimmer from "@/components/shimmer/Shimmer";

export function BlockElement({ id }: { id: string }) {
    const element: FlatsomeElement | undefined = use(getElementAction(id));

    if (element === undefined) {
        return undefined;
    }

    return <ElementWidget element={element} />;
}

export function BlockElementShimmer({ id }: { id: string }) {
    if (id === 'pc_main_slider') {
        return (
            <Shimmer loading width="100%" height="660px" backgroundSize="800px 680px">
                <div />
            </Shimmer>
        );
    }
    return null;
}