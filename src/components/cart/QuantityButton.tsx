'use client';

import type { Item } from '@/lib/wordpress/types';
import { updateItemQuantity } from '@/components/cart/actions';
import { useFormState } from 'react-dom';
import Quantity from './Quantity';
import { useEffect } from 'react';
import { useNotifications } from '@/components/ui/Notifications';

import type { UpdateQuantityPayload } from '@/lib/wordpress/types/cart_type';

export function QuantityButton({ item, optimisticUpdate, type = 'cart' }: {
    item: Item;
    optimisticUpdate: (payload: UpdateQuantityPayload) => void;
    type: string;
}) {
    const { addErrorNotification } = useNotifications();
    const [message, formAction] = useFormState(updateItemQuantity, '');

    const onChange = async (quantity: number) => {
        optimisticUpdate({ key: item.key, quantity: quantity });
        const submit = formAction.bind(null, { key: item.key, quantity: quantity });
        await submit();
    };

    useEffect(() => {
        if (message !== '') {
            addErrorNotification(message);
        }
    }, [message, addErrorNotification]);

    return (
        <Quantity
            qty={item.quantity}
            onChange={onChange}
            min={item.quantity_limits.minimum}
            max={item.quantity_limits.maximum}
            loading={false}
        />
    );

}