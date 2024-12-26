'use client';
import { useEffect} from "react";
import { useFormState } from 'react-dom';

import { RemoveCouponPayload } from "@/lib/wordpress/types/cart_type";
import { removeCoupon } from "./actions";
import { useNotifications } from "@/components/ui/Notifications";

export function RemoveCouponButton({ coupon, optimisticUpdate } : { coupon: any, optimisticUpdate:  (payload: RemoveCouponPayload) => void}) {

    const [dataForm, formAction] = useFormState(removeCoupon, {message: "", time: 0});

    const { addSuccessNotification, addErrorNotification } = useNotifications();

    const submit = formAction.bind(null, { code: coupon.code });
    const onClick = async (code: string) => {
        optimisticUpdate({ code });
        await submit();
    };
    
    useEffect(() => {
        if (!!dataForm.message) {
            addErrorNotification(dataForm.message);
        }

        if (dataForm.time !== 0 && dataForm.message === "") {
            addSuccessNotification(`Removed "${coupon.code}" successfully.`);
        }
    }, [dataForm, coupon.code, addErrorNotification, addSuccessNotification]);


    return (
        <button className="text-xs text-red-600" onClick={() => onClick(coupon.code)}>Remove</button>
    );
} 