'use client';
import { useEffect, useState} from "react";
import { useFormState } from 'react-dom';

import InputSelectCoupon from "./InputSelectCoupon";
import CouponForm, { ModalCouponForm } from "./CouponForm";
import { AddCouponPayload} from "@/lib/wordpress/types/cart_type";
import { applyCoupon } from "./actions";
import { useNotifications } from "@/components/ui/Notifications";

export function AddCouponInput({ coupons, couponList, optimisticUpdate } : { coupons: any[], couponList: any[], optimisticUpdate:  (payload: AddCouponPayload) => void}) {

    const [dataForm, formAction] = useFormState(applyCoupon, {message: ""});
    const [ loading, setLoading ] = useState(false);

    const { addSuccessNotification, addErrorNotification } = useNotifications();

    const onClick = async (code: string) => {
        optimisticUpdate({ code });
        setLoading(true);
        const submit = formAction.bind(null, { code });
        await submit();
    };
    
    useEffect(() => {
        if (!!dataForm.cart || !!dataForm.message) {
            setLoading(false);
        }
        if (!!dataForm.message) {
            addErrorNotification(dataForm.message);
        }
        if (!!dataForm.cart) {
            addSuccessNotification("Add coupon successfully.");
        }
    }, [dataForm, addErrorNotification, addSuccessNotification]);


    if (couponList.length > 0) {
        return (
            <>
                <InputSelectCoupon
                    couponsSelected={coupons}
                    couponList={couponList}
                    applyCoupon={(code) => onClick(code)}
                />
                <ModalCouponForm
                    applyCoupon={(code) => onClick(code)}
                    loading={loading}
                />
            </>
        )
    }

    return (
        <CouponForm
            applyCoupon={(code) => onClick(code)}
            loading={loading}
        />
    )
} 