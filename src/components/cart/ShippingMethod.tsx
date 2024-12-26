'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import { ShippingRate, ShippingMethod } from "@/lib/wordpress/types";
import { convertToStringPrice } from "@/utlis/price";
import { classnames } from "@/utlis/classnames";
import { useNotifications } from "@/components/ui/Notifications";
import { useFormState } from "react-dom";
import { selectShippingCart } from "./actions";
import { UpdateShippingMethodPayload } from "@/lib/wordpress/types/cart_type";

const MethodSingle = ({ method }: { method: ShippingMethod }) => {
    const price: number = !isNaN(Number(method.price)) ? Number(method.price) : 0;
    const taxes: number = !isNaN(Number(method.taxes)) ? Number(method.taxes) : 0;
    const currency: string = method.currency_code;
    const unit: number = method.currency_minor_unit;

    const total = price + taxes;

    return (
        <p className="text-xs">
            {method.name}
            {total > 0 && (
                <>
                    {" "}
                    {convertToStringPrice(`${total}`, unit, currency)}
                </>
            )}
        </p>
    );
}

export default function ShippingMethodCompoment({
    data,
    optimisticUpdate,
}: {
    data: ShippingRate,
    optimisticUpdate: (payload: UpdateShippingMethodPayload) => void;
}) {
    const [state, formAction] = useFormState(selectShippingCart, { message: undefined, cart: undefined });
    const [pending, setPending] = useState(false);
    const { addErrorNotification } = useNotifications();

    useEffect(() => {
        if (state.cart || state.message) {
            setPending(false);
        }
        if (state.message) {
            addErrorNotification(state.message);
        }

    }, [state, addErrorNotification]);

    const selectedMethod: string | undefined = useMemo(() => data.shipping_rates.find((method) => method.selected === true)?.rate_id, [data]);
    const methods: ShippingMethod[] = useMemo(() => data.shipping_rates, [data]);

    const changeMethod = useCallback(async (rateId: string, selected: boolean) => {
        if (!pending && selected) {
            optimisticUpdate({ packageId: data.package_id, rateId: rateId });
            const submit = formAction.bind(null, { packageId: data.package_id, rateId: rateId });
            await submit();
        }
    }, [data, pending, optimisticUpdate, formAction]);

    if (methods.length === 1 && methods[0].rate_id === selectedMethod) {
        return (<MethodSingle method={methods[0]} />)
    }

    return methods.map((method: ShippingMethod, i: number) => {
        const price: number = !isNaN(Number(method.price)) ? Number(method.price) : 0;
        const taxes: number = !isNaN(Number(method.taxes)) ? Number(method.taxes) : 0;
        const currency: string = method.currency_code;
        const unit: number = method.currency_minor_unit;

        const total = price + taxes;

        const selected = method.rate_id === selectedMethod;

        return (
            <div className="form-check" key={i}>
                <input
                    className={
                        classnames(
                            "form-check-input form-check-input_fill",
                            {
                                "cursor-pointer": !selected,
                            }
                        )
                    }
                    type="radio"
                    id={`shipping-${data.package_id}-${method.rate_id}`}
                    checked={selected}
                    onChange={(_) => changeMethod(method.rate_id, !selected)}
                />
                <label
                    className="form-check-label"
                    htmlFor={`shipping-${data.package_id}-${method.rate_id}`}
                >
                    {method.name}
                    {total > 0 && (
                        <>
                            {" "}
                            {convertToStringPrice(`${total}`, unit, currency)}
                        </>
                    )}
                </label>
            </div>
        )
    });
}