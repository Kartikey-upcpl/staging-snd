import React from 'react';
import {
    useHits,
    UseHitsProps,
} from 'react-instantsearch';
import Hit from '../hit';

import type { Document } from '@/lib/typesense/typesense_type';

interface CustomHitsProps extends UseHitsProps<Document> {
    view: number;
}

export default function CustomHits(props: CustomHitsProps) {
    const { items, sendEvent } = useHits<Document>(props);
    return (
        <ol className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${props.view}`}>
            {items.map((hit) => (
                <li
                    className='product-card-wrapper'
                    key={hit.rowID}
                    onClick={() => sendEvent('click', hit, 'Hit Clicked')}
                    onAuxClick={() => sendEvent('click', hit, 'Hit Clicked')}
                >
                    <Hit hit={hit} className="mb-3 mb-md-4 mb-xxl-5"/>
                </li>
            ))}
        </ol>
    );
}