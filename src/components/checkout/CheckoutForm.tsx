'use client';

import React, { use, useCallback, useEffect, useState, useTransition } from "react";
import type { Addresses, CheckoutPayload, CheckoutResponse, PaymentPublic, UpdateCustomerAddressPayload } from "@/lib/wordpress/types";
import { ApiResponse, type ApiError } from "@/lib/type-guards";

import PaymentMethods from "./PaymentMethods";
import ShippingMethos from "./inputs/ShippingMethods";
import { useCart } from "../cart/cart-context";
import { checkoutAction } from "./actions";
import { useFormState } from "react-dom";
import { useNotifications } from "@/components/ui/Notifications";
import { optionsPayment } from "./payment-gateways/options";
import Loading from "@/components/ui/Loading";
import CheckoutTotal from "./CheckoutTotal";
import CustomerAddress from "./CustomerAddress";
import ProgressPayment from "./payment-gateways";
import Link from "next/link";

interface CheckoutFormProps {
    addresssPromise: Promise<Addresses | ApiError>;
    paymentMethodsPromise: Promise<PaymentPublic[] | ApiError>;
}

export default function CheckoutForm(props: CheckoutFormProps) {
    const { addresssPromise, paymentMethodsPromise } = props;

    const addresss = use(addresssPromise);
    const paymentMethods = use(paymentMethodsPromise);

    const { cart } = useCart();

    const [isPending, startTransition] = useTransition();
    const { addErrorNotification } = useNotifications();
    const [state, formAction] = useFormState<ApiResponse<CheckoutResponse>, CheckoutPayload>(checkoutAction, { message: undefined, data: undefined });

    const [orderNote, setOrderNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
    const [formState, setFormState] = useState<UpdateCustomerAddressPayload>({
        billing_address: cart?.billing_address,
        shipping_address: cart?.shipping_address,
    });

    // Form errors
    const [errors, setErrors] = useState<UpdateCustomerAddressPayload>({
        billing_address: {},
        shipping_address: {}
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPaymentMethod = window.localStorage.getItem("paymentMethod");
            if (storedPaymentMethod) {
                setPaymentMethod(storedPaymentMethod);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("paymentMethod", paymentMethod);
        }
    }, [paymentMethod]);

    useEffect(() => {
        if (state.data) {
            // console.log(state.data);
        }
    }, [state]);

    // Update form state 
    const updateCustomerState = useCallback((payload: UpdateCustomerAddressPayload) => {
        const { billing_address, shipping_address } = payload;
        setFormState((prev) => {
            return {
                billing_address: {
                    ...prev.billing_address,
                    ...(billing_address && { ...billing_address })
                },
                shipping_address: {
                    ...prev.shipping_address,
                    ...(shipping_address && { ...shipping_address })
                }
            };
        });
    }, []);

    // Create action submit form
    const submitForm = useCallback(() => {
        if (paymentMethod === "" || !cart?.payment_methods.includes(paymentMethod)) {
            addErrorNotification("Please select a payment method");
            return;
        }

        // Validate form fields


        if (cart && cart.items_count > 0 && formState.billing_address && formState.shipping_address) {
            const options: {[key: string]: any} = optionsPayment[paymentMethod] ?? {}
            const submit = formAction.bind(null, {
                billing_address: formState.billing_address,
                shipping_address: formState.shipping_address,
                payment_method: paymentMethod,
                customer_note: orderNote,
                payment_data: [
                    {
                        key: 'app',
                        value: 'cirilla'
                    }
                ],
                ...options,
            });
            startTransition(async () => {
                await submit();
            });
        } else {
            addErrorNotification("Cart is empty");
        }
    }, [cart, formState, paymentMethod, orderNote, formAction, addErrorNotification]);

    if (!cart || cart.items_count === 0) {
        return (
            <div>
                <div className="fs-20">Shop cart is empty</div>
                <Link href={"/collections"} className="btn mt-3 btn-light">Explore Products</Link>
            </div>
        );
    }

    return (
        <>
            {paymentMethod && state.data && <ProgressPayment paymentMethod={paymentMethod} data={state.data} />}
            <form>
                {state.message && <p>{state.message}</p>}
                <div className="checkout-form">
                    <div className="billing-info__wrapper">
                        <CustomerAddress
                            addresss={addresss}
                            formState={formState}
                            updateCustomerState={updateCustomerState}
                            shipToDifferentAddress={shipToDifferentAddress}
                            setShipToDifferentAddress={setShipToDifferentAddress}
                        />
                        <div className="col-md-12">
                            <div className="mt-3">
                                <textarea
                                    className="form-control form-control_gray"
                                    placeholder="Order Notes (optional)"
                                    cols={30}
                                    rows={8}
                                    value={orderNote}
                                    onChange={(e) => setOrderNote(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="checkout__totals-wrapper">
                        <div className="sticky-content">
                            <CheckoutTotal />
                            <ShippingMethos />
                            <PaymentMethods
                                paymentMethods={paymentMethods}
                                value={paymentMethod}
                                onChanged={setPaymentMethod}
                            />
                            {state.message && <p>{state.message}</p>}
                            <button
                                type="submit"
                                className="btn btn-primary btn-checkout"
                                onClick={(e) => {
                                    e.preventDefault();
                                    submitForm();
                                }}
                            >
                                {isPending ? <Loading className="spinner-border-sm text-white" /> : "Proceed to checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}