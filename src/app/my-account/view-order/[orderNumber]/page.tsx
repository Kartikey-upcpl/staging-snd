"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/components/checkout/actions";
import { Order } from "@/lib/wordpress/types";
import { divide } from "lodash";
import Loading from "@/components/ui/Loading";


export default function ViewOrderPage() {
    const { orderNumber } = useParams(); // Get orderNumber from the route
    console.log("orderNumber", orderNumber)
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("orderDetaosl", order)

    useEffect(() => {
        async function fetchOrderDetails(orderNumber: number) {
            try {
                const orderDetails = await getOrderById(orderNumber);
                if (orderDetails) {
                    setOrder(orderDetails);
                } else {
                    console.error("Order not found");
                    setError("Order not found");
                }
            } catch (err) {
                console.error("Failed to fetch order details:", err);
                setError("Failed to fetch order details.");
            }
        }


        if (orderNumber) {
            const parsedOrderNumber =
                Array.isArray(orderNumber) ? parseInt(orderNumber[0], 10) : parseInt(orderNumber, 10);

            if (!isNaN(parsedOrderNumber)) {
                fetchOrderDetails(parsedOrderNumber);
            } else {
                console.error("Invalid order number");
                setError("Invalid order number");
            }
        }
    }, [orderNumber]);

    if (!order) {
        return (
            <div className="h-1/2 flex flex-col items-center justify-center">
                <p><Loading /></p>
                <p>Loading order details...</p>
            </div>
        );
    }

    const formattedDate = new Date(order.date_created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (

        <div className="max-w-4xl mx-auto sm:p-6 p-3 pt-10 bg-white rounded">
            <p className="mb-4">Order # <span className="bg-yellow-300"> {order.number}</span> was placed on <span className="bg-yellow-300"> {formattedDate}</span>  and is currently <span className="bg-yellow-300"> {order?.status}</span>.</p>
            <p className="text-xl font-semibold text-[#000055] mb-4">
                Order Details
            </p>
            <div className="flex justify-between font-semibold text-lg text-{#0A0A0A] border-b border-gray-300">
                <p>
                    Product
                </p>
                <div>
                    Total
                </div>
            </div>
            {order.line_items.map((item, index) => (
                <div key={index} className="border-b border-gray-300 py-2 flex justify-between">
                    <p className="font-medium max-w-[80%] text-gray-500">{item.name} × {item.quantity} </p>
                    <p className="text-sm text-{#0A0A0A] font-semibold  self-center">
                        ₹{item.price}.00
                    </p>
                </div>
            ))}
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Subtotal:</p>
                <p className="text-sm text-{#0A0A0A] font-semibold">
                    ₹{order?.total}.00
                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Shipping:</p>
                <p className="text-sm text-gray-500 font-semibold">
                    {order?.shipping_total === "0.00" ? "Free Shipping" : order?.shipping_total}
                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Payment Method:</p>
                <p className="text-sm text-gray-500 font-semibold">
                    {order?.payment_method_title}
                </p>
            </div>
            <div className="border-b border-gray-300 py-2 flex justify-between ">
                <p className="font-semibold">Total:</p>
                <p className="text-sm text-{#0A0A0A] font-semibold">
                    ₹{order?.total}
                </p>
            </div>


            <div className="mt-6">
                <p className="text-xl font-semibold text-[#000055] mb-2">
                    Billing address
                </p>
                <div className="italic">
                    <p>
                        {order.billing.first_name} {order.billing.last_name}
                    </p>
                    <p>{order.billing.address_1}</p>
                    <p>
                        {order.billing.city}, {order.billing.state},{" "}
                        {order.billing.postcode}
                    </p>
                    <p>Email: {order.billing.email}</p>
                    <p>Phone: {order.billing.phone}</p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xl font-semibold text-[#000055] mb-2">
                    Shipping address
                </p>
                <div className="italic">
                    <p>
                        {order.shipping.first_name} {order.shipping.last_name}
                    </p>
                    <p>{order.shipping.address_1}</p>
                    <p>
                        {order.shipping.city}, {order.shipping.state},{" "}
                        {order.shipping.postcode}
                    </p>
                </div>
            </div>
        </div>
    );
}
