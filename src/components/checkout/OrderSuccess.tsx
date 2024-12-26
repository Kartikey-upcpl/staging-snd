'use client';

import React, { use } from "react";
import type { Addresses, Order } from "@/lib/wordpress/types";
import { convertToStringPrice } from "@/utlis/price";
import { isApiError, type ApiError } from "@/lib/type-guards";
import { convertAddress } from "@/utlis/address";

interface OrderSuccessProps {
    addressesPromise: Promise<Addresses | ApiError>;
    orderPromise: Promise<Order | ApiError>;
}

export function OrderSuccess({ addressesPromise, orderPromise }: OrderSuccessProps) {
    const order = use<Order | ApiError>(orderPromise);
    const addresses = use<Addresses | ApiError>(addressesPromise);

    if (isApiError(order)) {
        return (
            <div className="order-complete">
                <p>{order.message}</p>
            </div>
        )
    }

    const subTotal: string = order.line_items.reduce((result, item) => {
        return result + Number(item.subtotal);
    }, 0).toString();

    const addressesData: Addresses | undefined = isApiError(addresses) ? undefined : addresses;

    return (
        <div className="order-complete">
            <div className="order-complete__message">
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="40" cy="40" r="40" fill="#B9A16B" />
                    <path
                        d="M52.9743 35.7612C52.9743 35.3426 52.8069 34.9241 52.5056 34.6228L50.2288 32.346C49.9275 32.0446 49.5089 31.8772 49.0904 31.8772C48.6719 31.8772 48.2533 32.0446 47.952 32.346L36.9699 43.3449L32.048 38.4062C31.7467 38.1049 31.3281 37.9375 30.9096 37.9375C30.4911 37.9375 30.0725 38.1049 29.7712 38.4062L27.4944 40.683C27.1931 40.9844 27.0257 41.4029 27.0257 41.8214C27.0257 42.24 27.1931 42.6585 27.4944 42.9598L33.5547 49.0201L35.8315 51.2969C36.1328 51.5982 36.5513 51.7656 36.9699 51.7656C37.3884 51.7656 37.8069 51.5982 38.1083 51.2969L40.385 49.0201L52.5056 36.8996C52.8069 36.5982 52.9743 36.1797 52.9743 35.7612Z"
                        fill="white"
                    />
                </svg>
                <h3>Order received</h3>
                <p>Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.</p>
            </div>
            <div className="order-info">
                <div className="order-info__item">
                    <label>Order Number</label>
                    <span>{order.number}</span>
                </div>
                <div className="order-info__item">
                    <label>Date</label>
                    <span>{new Date(order.date_created).toLocaleDateString()}</span>
                </div>
                <div className="order-info__item">
                    <label>Total</label>
                    <span>{convertToStringPrice(order.total, 0, order.currency)}</span>
                </div>
                <div className="order-info__item">
                    <label>Payment Method</label>
                    <span dangerouslySetInnerHTML={{ __html: order.payment_method_title }} />
                </div>
            </div>
            <div className="checkout__totals-wrapper">
                <div className="checkout__totals !mb-0">
                    <h3>Order Details</h3>
                    <table className="checkout-cart-items">
                        <thead>
                            <tr>
                                <th>PRODUCT</th>
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.line_items.map((item) => (
                                <tr key={item.id}>
                                    <td dangerouslySetInnerHTML={{ __html: `${item.name} x ${item.quantity}` }} />
                                    <td>{convertToStringPrice(`${Number(item.subtotal) / item.quantity}`, 0, order.currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="checkout-totals">
                        <tbody>
                            <tr>
                                <th>SUBTOTAL</th>
                                <td>{convertToStringPrice(subTotal, 0, order.currency)}</td>
                            </tr>
                            <tr>
                                <th>SHIPPING</th>
                                <td>
                                    {order.shipping_lines.length > 0 ? (
                                        <>
                                            {order.shipping_lines.map((shippingItem) => (
                                                <p key={shippingItem.id}>
                                                    {shippingItem.method_title}
                                                    {Number(shippingItem.total) > 0 && (
                                                        <>
                                                            {" - "}
                                                            {convertToStringPrice(shippingItem.total, 0, order.currency)}
                                                        </>
                                                    )}
                                                </p>
                                            ))}
                                        </>
                                    ) : convertToStringPrice(order.shipping_total, 0, order.currency)}
                                </td>
                            </tr>
                            {Number(order.cart_tax) > 0 && (
                                <tr>
                                    <th>TAX</th>
                                    <td>{convertToStringPrice(order.cart_tax, 0, order.currency)}</td>
                                </tr>
                            )}
                            {Number(order.discount_total) > 0 && (
                                <tr>
                                    <th>DISCOUNT</th>
                                    <td>- {convertToStringPrice(order.discount_total, 0, order.currency)}</td>
                                </tr>
                            )}
                            <tr>
                                <th>TOTAL</th>
                                <td>{convertToStringPrice(order.total, 0, order.currency)}</td>
                            </tr>
                            {!!order.customer_note && (
                                <tr>
                                    <th>NOTE</th>
                                    <td>{order.customer_note}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="checkout__totals-wrapper">
                <div className="checkout__totals !pt-6">
                    <table className="checkout-totals">
                        <thead>
                            <tr>
                                <th className="!pr-2">BILLING ADDRESS</th>
                                {<th className="!pl-2">SHIPPING ADDRESS</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="align-top !pr-2">
                                    <p className="whitespace-break-spaces">
                                        {convertAddress(order.billing, addressesData, "billing")}
                                    </p>
                                    {!!order?.billing?.phone && !!order?.billing?.email && (
                                        <p className="mt-2 whitespace-break-spaces">
                                            {order?.billing.phone}{"\n"}
                                            {order?.billing.email}
                                        </p>
                                    )}
                                </td>
                                <td className="align-top !pl-2">
                                    <p className="whitespace-break-spaces">
                                        {convertAddress(order.shipping, addressesData, "shipping")}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}