'use client';

import React from "react";
import { OrderReceivedResponse, OrderReceivedAddress, Addresses } from "@/lib/wordpress/types";
import { convertToStringPrice } from "@/utlis/price";
import CheckoutSteps from "../ui/CheckoutSteps";

export const Address = ({ address, addresses, type = "billing" }: { address: OrderReceivedAddress, addresses: Addresses | undefined, type?: string }) => {
    const nameCountry: string | undefined = type === "shipping" ? addresses?.billing_countries?.[address.country] : addresses?.shipping_countries?.[address.country];

    const states: { [key: string]: string } | undefined = type === "shipping" ? addresses?.shipping_country_states?.[address.country] : addresses?.billing_countries_states?.[address.country];
    const nameState = states?.[address.state] ?? address.state;

    return (
        <>
            <p className="font-bold">{address.first_name} {address.last_name}</p>
            {!!address.company && <p>{address.company}</p>}
            <p>{address.address_1}</p>
            <p>{address.address_2}</p>
            <p>{address.city}</p>
            <p>{nameState}</p>
            <p>{nameCountry ?? address.country} - {address.postcode}</p>
            {!!address?.phone && (
                <p>{address.phone}</p>
            )}
            {!!address?.email && (
                <p className="mt-2">{address.email}</p>
            )}
        </>
    )
}

interface OrderSuccessProps {
    order: OrderReceivedResponse;
    addresses: Addresses | undefined;
}

export function OrderPending({ order, addresses }: OrderSuccessProps) {

    return (
        <div>
            <CheckoutSteps />
            <div className="mt-6">
                <p className="text-xl font-semibold text-[#000055] mb-2">
                    Billing address
                </p>
                <div className="italic">
                    <p>
                        {order.billing_address.first_name} {order.billing_address.last_name}
                    </p>
                    <p>{order.billing_address.address_1}</p>
                    <p>
                        {order.billing_address.city}, {order.billing_address.state},{" "}
                        {order.billing_address.postcode}
                    </p>
                    <p>Email: {order.billing_address.email}</p>
                    <p>Phone: {order.billing_address.phone}</p>
                </div>
            </div>
            <p className="text-xl font-semibold text-[#000055] mb-4">
                Order Details
            </p>
            <div className="flex justify-between font-semibold text-lg text-{#0A0A0A] border-b border-gray-300">
                <p className="w-4/6">
                    Product
                </p>
                <p className="w-1/6 text-center">
                    QTY
                </p>
                <p className="w-1/6 text-end">
                    Total
                </p>
            </div>
            {order.items.map((item, index) => (
                <div key={index} className="border-b border-gray-300 py-2 flex">
                    <p className="w-4/6	 font-medium   text-gray-500">{item.name}  </p>
                    <p className="w-1/6 font-medium text-center  text-gray-500">{item.quantity} </p>
                    <p className="text-sm text-{#0A0A0A] w-1/6 font-semibold  text-end">
                        ₹{((Number(item?.prices?.price) || 0) / 100).toFixed(2)}
                    </p>
                </div>
            ))}
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Subtotal:</p>
                <p className="text-sm text-{#0A0A0A] font-semibold">
                    ₹{((Number(order?.totals?.subtotal) || 0) / 100).toFixed(2)}
                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Discount:</p>
                <p className="text-sm text-[#0A0A0A] font-semibold">
                    ₹{((Number(order?.totals?.total_discount) || 0) / 100).toFixed(2)}

                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Payment Method:</p>
                <p className="text-sm text-gray-500 font-semibold">
                    {/* {order?.payment_method_title} */} not comes from api
                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Total:</p>
                <p className="text-sm text-{#0A0A0A] font-semibold">
                    ₹{((Number(order?.totals?.total_price) || 0) / 100).toFixed(2)}

                </p>
            </div>
            {order?.status === "pending" ? (
                <div className="flex justify-center mt-5">
                    <button className="btn btn-primary btn-checkout bg-green-700 hover:bg-green-800">
                        Pay For Order
                    </button>
                </div>
            ) : (
                <p className="text-center text-red-500 mt-5 p-5 border-2">
                    This order’s status is “Processing”—it cannot be paid for. Please contact us if you need assistance.
                </p>
            )}

            {/* {JSON.stringify(order)} */}
        </div>
    );
}