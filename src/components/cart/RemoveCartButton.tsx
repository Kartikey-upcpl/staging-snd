'use client';

import { removeItem } from '@/components/cart/actions';
import { useFormState } from 'react-dom';

import type { RemoveItemPayload } from '@/lib/wordpress/types/cart_type';
import type { Item } from '@/lib/wordpress/types';

export function RemoveCartButton({ item, optimisticUpdate, type = 'cart' }: {
    item: Item;
    optimisticUpdate:  (payload: RemoveItemPayload) => void;
    type: string;
}) {

    const key = item.key;

    const [_, formAction] = useFormState(removeItem, '');
    const submit = formAction.bind(null, { key });

    const onClick = async () => {
        optimisticUpdate({ key });
        await submit();
    };

    if (type !== 'cart') {
        return (
            <button
                onClick={onClick}
                className="btn-close-xs position-absolute top-0 end-0 js-cart-item-remove"
            />
        );
    }

    return (
        <a
            onClick={onClick}
            className="remove-cart"
        >
            <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="#767676"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
            </svg>
        </a>
    );
}