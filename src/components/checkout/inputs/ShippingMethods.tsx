'use client';

import React from "react";
import type { Cart, SelectShippingRatePayload, ShippingMethod } from "@/lib/wordpress/types";
import { ApiResponse } from "@/lib/type-guards";
import { useCart } from "@/components/cart/cart-context";
import { useFormState } from "react-dom";
import { selectShippingMethod } from "../actions";
import { convertToStringPrice } from "@/utlis/price";
import BoxRadioList, { BoxRadioListOptionType } from "@/components/ui/BoxRadioList";

interface CheckoutFormProps {};

const getOptions = (data: ShippingMethod[]): BoxRadioListOptionType[] =>{

    return data.map((item: ShippingMethod) => {
        const price: number = !isNaN(Number(item.price)) ? Number(item.price) : 0;
        const taxes: number = !isNaN(Number(item.taxes)) ? Number(item.taxes) : 0;
        const currency: string = item.currency_code;
        const unit: number = item.currency_minor_unit;

        const total = price + taxes;

        return {
            key: item.rate_id,
            title: item.name,
            subtitle: total === 0 ? "FREE" : convertToStringPrice(`${total}`, unit, currency),
        }
    });
}

const getSelected = (data: ShippingMethod[]): string | undefined =>{

    return data.find((item: ShippingMethod) => item.selected === true)?.rate_id;
}

export default function ShippingMethos(props: CheckoutFormProps) {
    const { cart, selectShippingMethod: selectShippingMethodContext } = useCart();
    const [_, formAction] = useFormState<ApiResponse<Cart>, SelectShippingRatePayload>(selectShippingMethod, { message: undefined, data: undefined});
    
    return (
        <>
            {cart && cart.shipping_rates.map((shipping_rate) => (
                <div key={shipping_rate.package_id} className="!mb-5">
                    <h4 className="uppercase !mb-2">
                        Shipping
                        {cart.shipping_rates.length > 1 && (
                            <>
                                {" : "}
                                {shipping_rate.name}
                            </>
                        )}
                    </h4>
                    <BoxRadioList
                        options={getOptions(shipping_rate.shipping_rates)}
                        selected={getSelected(shipping_rate.shipping_rates)}
                        onSelected={(value) => {
                            selectShippingMethodContext({ packageId: shipping_rate.package_id, rateId: value });
                            formAction({ package_id: shipping_rate.package_id, rate_id: value });
                        }}
                        className="checkout__payment-methods !p-0"
                    />
                </div>
            ))}
        </>
    );
}