'use client';
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useCart } from "@/components/cart/cart-context";

import { getOrders, OrderListType } from "./actions";
import { Order } from "@/lib/wordpress/types";
import { ApiError, isApiError } from "@/lib/type-guards";

import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import { initializeIntercom, waitForIntercom } from "../bottombar/component/loadIntercomSdk";

function NotificationTable({ children }: { children: React.ReactNode }) {
    return (
        <tr>
            <td colSpan={5} className="!no-underline w-full h-52">
                {children}
            </td>
        </tr>
    );
}

function OrderItem({ order }: { order: Order }) {
    const formattedDate = new Date(order.date_created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const [isLoading, setLoading] = useState(false); // State to manage loading

    const handleChatMessage = async (message: string) => {
        setLoading(true); // Start loading
        initializeIntercom(); // Initialize Intercom
        await waitForIntercom(); // Wait until Intercom is ready
        setLoading(false); // Stop loading
        window.Intercom?.("showNewMessage", message);
    };

    const carrierMeta = order?.meta_data?.find((meta) => meta.key === "ywot_carrier_id");
    const carrierIdValue = carrierMeta?.value.trim();


    return (
        <>
            {/* Table Layout for Larger Screens */}
            <tr className="hidden md:table-row border-b border-gray-300">
                <td className="px-2 py-1 border-r border-gray-300">
                    <Link href={`/my-account/view-order/${order.number}`}>
                        #{order.number}
                    </Link>
                </td>
                <td className="px-2 py-1 border-r border-gray-300">{formattedDate}</td>
                <td className="px-2 py-1 border-r border-gray-300">
                    <Image
                        src={order?.line_items[0]?.image?.src ?? "/placeholder.png"}
                        alt="Product Image"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </td>
                <td className="px-2 py-1 border-r border-gray-300 w-1/2">
                    {order?.line_items[0]?.name.slice(0, 50)}...
                </td>
                <td className="px-2 py-1 border-r border-gray-300">
                    ₹{Number(order?.total).toFixed(2)} for {order?.line_items.length} items
                </td>
                <td className="px-2 py-1 border-r border-gray-300">{order?.status}</td>
                <td className="px-2 py-1 w-1/4">
                    <div className="flex flex-col gap-2">
                        {carrierIdValue && carrierIdValue !== "UNKNOWN" && (
                            <Link
                                href={{
                                    pathname: "/track-order",
                                    query: { email: order?.billing?.email, orderID: order?.id },
                                }}
                                className="bg-red-500 text-white text-center px-4 py-2 rounded hover:bg-red-600"
                            >
                                Track Your Order
                            </Link>
                        )}
                        {order?.status === "pending" &&
                            <Link
                                href={`/checkout/order-pay/${order.number}/?pay_for_order=true&key=${order?.order_key}`}
                                className="w-full text-center bg-red-500 text-white      py-2 rounded hover:bg-red-600 whitespace-nowrap"
                            >
                                Pay
                            </Link>
                        }
                        <Link
                            href={`/my-account/view-order/${order.number}`}
                            className="w-full text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 whitespace-nowrap"
                        >
                            View Order Details
                        </Link>
                        <button
                            onClick={() => {
                                const orderId = order?.id;
                                const name = order?.billing?.first_name + order?.billing?.last_name;
                                const email = order?.billing?.email;
                                const phone = order?.billing?.phone;

                                const customMessage = `Hi! I need help Related my order id #${orderId}
Name: ${name}
Email: ${email}
Phone: ${phone}`;

                                handleChatMessage(customMessage);
                            }}
                            className="w-full text-center bg-red-500 text-white      py-2 rounded hover:bg-red-600 whitespace-nowrap"
                        >
                            {isLoading ? <Loading className="spinner-border-sm text-white" /> : "Get Product Support"}
                        </button>

                    </div>
                </td>
            </tr>



            {/* Card Layout for Mobile */}
            <div className="block md:hidden border border-gray-300 rounded-md p-4 mb-4 shadow ">
                <p className="text-sm font-semibold text-gray-600 text-center"> #{order.number}</p>
                <p className=" text-gray-500 text-center">{formattedDate}</p>
                <div className="flex justify-center my-4">
                    <Image
                        src={order?.line_items[0]?.image?.src ?? "/placeholder.png"}
                        alt="Product Image"
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>
                <p className="text-sm text-center font-medium text-gray-700">
                    {order?.line_items[0]?.name}
                </p>
                <p className="text-center font-bold text-gray-800 mt-2">
                    ₹{Number(order?.total).toFixed(2)} for {order?.line_items.length} items
                </p>
                <p className="text-center text-sm text-gray-500">{order?.status}</p>
                <div className="flex flex-col gap-2 mt-4">
                    {carrierIdValue && carrierIdValue !== "UNKNOWN" && (
                        <Link
                            href={{
                                pathname: "/track-order",
                                query: { email: order?.billing?.email, orderID: order?.id },
                            }}
                            className="bg-red-500 text-white text-center px-4 py-2 rounded hover:bg-red-600"
                        >
                            Track Your Order
                        </Link>
                    )}
                    {order?.status === "pending" &&
                        <Link
                            href={`/checkout/order-pay/${order.number}`}
                            className="w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap"
                        >
                            Pay
                        </Link>
                    }
                    <Link
                        href={`/my-account/view-order/${order.number}`}
                        className="bg-red-500 text-white text-center px-4 py-2 rounded hover:bg-red-600"
                    >
                        View Order Details
                    </Link>
                    <button
                        onClick={() => {
                            const orderId = order?.id;
                            const name = order?.billing?.first_name + order?.billing?.last_name;
                            const email = order?.billing?.email;
                            const phone = order?.billing?.phone;

                            const customMessage = `Hi! I need help Related my order id #${orderId}
Name: ${name}
Email: ${email}
Phone: ${phone}`;

                            handleChatMessage(customMessage);
                        }}
                        className="w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap"
                    >
                        {isLoading ? <Loading className="spinner-border-sm text-white" /> : "Get Product Support"}
                    </button>
                </div>
            </div>
        </>
    );
}


export default function OrderDashboard({ page = 1 }: { page?: number }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useCart();

    const [data, setData] = useState<OrderListType>({
        totalItems: 0,
        totalPage: 0,
        orders: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res: OrderListType | ApiError = await getOrders(user?.ID ?? "0", page);
            if (isApiError(res)) {
                setMessage(res.message);
                setLoading(false);
                return;
            }

            setData(res);
            setLoading(false);
        }
        if (!!user?.ID) {
            fetchData();
        }
    }, [page, user?.ID]);

    const createQueryString = useCallback(
        (name: string, value: string | undefined) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value !== undefined) {
                params.set(name, value)
            } else {
                if (params.has(name)) {
                    params.delete(name);
                }
            }


            return params.toString()
        },
        [searchParams]
    )

    const onChangePagination = useCallback((newPage: number) => {
        if (newPage !== page) {
            router.push(pathname + '?' + createQueryString('page', newPage > 1 ? `${newPage}` : undefined));
        }
    }, [page, pathname, router, createQueryString]);

    return (
        <div className="page-content my-account__orders-list">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="hidden md:table-row">
                        <th className="border px-4 py-2 text-left">Order</th>
                        <th className="border px-4 py-2 text-left">Date</th>
                        <th className="border px-4 py-2 text-left">Image</th>
                        <th className="border px-4 py-2 text-left">Product</th>
                        <th className="border px-4 py-2 text-left">Price</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <NotificationTable>
                            <center><Loading /> </center>
                        </NotificationTable>
                    ) : !!message ? (
                        <NotificationTable>
                            <p className="text-red-500 text-center">{message}</p>
                        </NotificationTable>
                    ) : data.orders.length < 1 ? (
                        <NotificationTable>
                            <p className="text-center border-b-0 text-gray-500">Data empty</p>
                        </NotificationTable>
                    ) : data.orders.map(o => (
                        <OrderItem key={o.number} order={o} />
                    ))}
                </tbody>
            </table>
            {
                data.totalPage > 1 && (
                    <center className="mt-6">
                        <Pagination
                            pagination={data.totalPage}
                            currentVisit={page}
                            onChangePagination={onChangePagination}
                        />
                    </center>
                )
            }
        </div >
    );
}