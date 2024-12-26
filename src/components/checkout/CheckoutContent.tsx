import React from "react";
import CheckoutForm from "./CheckoutForm";

import type { Addresses, PaymentPublic } from "@/lib/wordpress/types";
import type { ApiError } from "@/lib/type-guards";

interface CheckoutContentProps {
    addresssPromise: Promise<Addresses | ApiError>;
    paymentMethodsPromise: Promise<PaymentPublic[] | ApiError>;
}

export default function CheckoutContent({ addresssPromise, paymentMethodsPromise }: CheckoutContentProps) {
    return (
        <CheckoutForm
            addresssPromise={addresssPromise}
            paymentMethodsPromise={paymentMethodsPromise}
        />
    )
}