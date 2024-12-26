import { useCart } from "@/components/cart/cart-context";
import { loadScript, removeScript } from "@/utlis/script";
import { useEffect, useState } from "react";
import { checkoutOrderAction } from "@/components/checkout/actions";
import { revalidateTagCart } from "@/components/cart/actions";
import { useRouter } from 'next/navigation';
import qs from 'qs';

import type { CheckoutResponse } from '@/lib/wordpress/types';

const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const brand_name = process.env.NEXT_PUBLIC_BRAND_NAME;
const brand_description = process.env.NEXT_PUBLIC_BRAND_DESCRIPTION;
const razorpay_script = "https://checkout.razorpay.com/v1/checkout.js";

interface PaymentGatewaysProps {
    data: CheckoutResponse;
}

export default function RazorpayPaymentGateway(props: PaymentGatewaysProps) {
    const { cart } = useCart();
    const router = useRouter();

    const total = cart?.totals?.total_price ?? 0;
    const currency = cart?.totals?.currency_code;
    const razorpayOrderId = props?.data?.payment_result?.payment_details?.find((item: { key: string, value: string }) => item.key === 'razorpayOrderId');
    const redirectUrl = props?.data?.payment_result?.payment_details?.find((item: { key: string, value: string }) => item.key === 'redirectUrl');

    const [loadingScript, setLoadingScript] = useState(false);

    useEffect(() => {
        // Load the Razorpay script only once.
        if (!loadingScript && razorpayOrderId?.value) {
            loadScript(razorpay_script).then((result) => {
                setLoadingScript(true);
            });
        }
    }, [loadingScript, razorpayOrderId?.value]);

    // Load the Razorpay script
    useEffect(() => {
        if (!loadingScript) return;
        if (!razorpayOrderId) return;
        if (!total || !currency) return;
        const options = {
            "key": key_id, // Enter the Key ID generated from the Dashboard
            "amount": total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,
            "name": brand_name,
            "description": brand_description,
            // "image": "https://example.com/your_logo",
            "order_id": razorpayOrderId.value,
            "prefill": {
                "name": props.data.billing_address.first_name + ' ' + props.data.billing_address.last_name,
                "email": props.data.billing_address.email,
                "contact": props.data.billing_address.phone,
            },
            "handler": async function (response: any) {
                const razorpay_order_id = response.razorpay_order_id;
                const razorpay_payment_id = response.razorpay_payment_id;
                const razorpay_signature = response.razorpay_signature;
                const res = checkoutOrderAction(props.data.order_id, {
                    key: props.data.order_key,
                    billing_address: props.data.billing_address,
                    shipping_address: props.data.shipping_address,
                    payment_method: props.data.payment_method,
                    customer_note: props.data.customer_note,
                    payment_data: [
                        { key: 'app', value: 'cirilla' },
                        { key: 'razorpay_order_id', value: razorpay_order_id },
                        { key: 'razorpay_payment_id', value: razorpay_payment_id },
                        { key: 'razorpay_signature', value: razorpay_signature },
                        { key: 'razorpay_wc_form_submit', value: '1' },
                        { key: 'check_razorpay_response', value: '1' }
                    ],
                });

                removeScript(razorpay_script);
                const query = qs.stringify({ key: props.data.order_key, ...(props?.data?.billing_address?.email && {email: encodeURIComponent(props?.data?.billing_address?.email)}) });
                revalidateTagCart();
                router.replace('/checkout/order-received/' + props.data.order_id + '?' + query);
            },
        };
        // eslint-disable-next-line no-undef
        const rzp = new Razorpay(options) as any;
        rzp.open();
        rzp.on('payment.failed', function (response: any) {
            // alert(response.error.code);
            alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
    });
    }, [total, currency, razorpayOrderId, redirectUrl, loadingScript]);


    return null;
}