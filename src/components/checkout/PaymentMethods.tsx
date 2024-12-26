'use client';

import React from "react";
import type { PaymentPublic } from "@/lib/wordpress/types";
import { isApiError, type ApiError } from "@/lib/type-guards";
import BoxRadioList, { BoxRadioListOptionType } from "@/components/ui/BoxRadioList";
import { useCart } from "@/components/cart/cart-context";

const getOptions = (data: PaymentPublic[]): BoxRadioListOptionType[] => {
    return data.map(item => {
        return {
            key: item.id,
            title: item.title,
            description: item.description,
        };
    });
}

interface CheckoutFormProps {
    value: string;
    onChanged: (value: string) => void;
    paymentMethods: PaymentPublic[] | ApiError;
}

export default function PaymentMethods(props: CheckoutFormProps) {

    const { paymentMethods, value, onChanged } = props;
    const { cart } = useCart();

    if (cart?.needs_payment === true) {
        if (isApiError(paymentMethods)) {
            return (
                <div className="checkout__payment-methods">
                    <p className="text-red-500 !mb-5">{paymentMethods.message}</p>
                </div>
            );
        }

        return (
            <div className="!mb-5">
                <h4 className="uppercase !mb-2">Payment methods</h4>
                <BoxRadioList
                    options={getOptions(paymentMethods)}
                    selected={value}
                    onSelected={onChanged}
                    className="checkout__payment-methods !p-0"
                />
            </div>
        );
    }
    return undefined;
}