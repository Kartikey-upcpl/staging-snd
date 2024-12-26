import type { CheckoutResponse } from '@/lib/wordpress/types';
import Razorpay from './razorpay';
import Cod from './cod';

interface PaymentGatewaysProps {
    paymentMethod: string;
    data: CheckoutResponse;
}

export default function ProgressPayment(props: PaymentGatewaysProps) {
    if (props.paymentMethod === 'razorpay') {
        return <Razorpay data={props.data} />;
    }

    if (props.paymentMethod === 'cod') {
        return <Cod data={props.data} />;
    }
    return null;
}