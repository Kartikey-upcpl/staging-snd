import React, { useMemo } from "react";
import { useCart } from "@/components/cart/cart-context";
import { convertToStringPrice } from "@/utlis/price";
import type { Item, ShippingMethod, ShippingRate, TaxLine } from "@/lib/wordpress/types";
import Link from "next/link";

const getTextShippingRate = (data: ShippingMethod): string => {

    const price: number = !isNaN(Number(data.price)) ? Number(data.price) : 0;
    const taxes: number = !isNaN(Number(data.taxes)) ? Number(data.taxes) : 0;
    const currency: string = data.currency_code;
    const unit: number = data.currency_minor_unit;

    const total = price + taxes;

    return total > 0 ? `${data.name} - ${convertToStringPrice(`${total}`, unit, currency)}` : data.name;
}

const getUriProduct = (item: Item): string => {
    const slug = item.permalink.split("/product/")?.[1] ?? "";
    return !!slug ? `/product/${slug}` : ""; 
}

export default function CheckoutTotal() {
    const { cart } = useCart();

    const items: Item[] = useMemo(() => cart?.items ?? [], [cart]);
    const coupons: any[] = useMemo(() => cart?.coupons ?? [], [cart]);
    const shippingRates: ShippingRate[] = useMemo(() => cart?.shipping_rates ?? [], [cart]);

    const totalItems: string = useMemo(() => cart?.totals?.total_items ?? "0", [cart]);
    const totalItemsTax: string = useMemo(() => cart?.totals?.total_items_tax ?? "0", [cart]);
    const totalTax: string = useMemo(() => cart?.totals?.total_tax ?? "0", [cart]);
    const totalPrice: string = useMemo(() => cart?.totals?.total_price ?? "0", [cart]);

    const unit: number = useMemo(() => cart?.totals?.currency_minor_unit ?? 0, [cart]);
    const currency: string = useMemo(() => cart?.totals?.currency_code ?? "USD", [cart]);

    if (items.length) {

        return (
            <div className="checkout__totals">
                <h3>Your Order</h3>
                <table className="checkout-cart-items">
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((p) => (
                            <tr key={p.key}>
                                <td>
                                    <Link href={getUriProduct(p)} target="_blank" dangerouslySetInnerHTML={{__html: `${p.name} x ${p.quantity}`}}/>
                                </td>
                                <td>{convertToStringPrice(`${Number(p.prices?.price ?? 0) * p.quantity}`, p.prices?.currency_minor_unit ?? 0, p.prices?.currency_code ?? "USD")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="checkout-totals">
                    <tbody>
                        <tr>
                            <th>SUBTOTAL</th>
                            <td>{convertToStringPrice(`${Number(totalItems) + Number(totalItemsTax)}`, unit, currency)}</td>
                        </tr>
                        {coupons.length > 0 && coupons.map((coupon: any, i: number) => {
                            const totalDiscount = !isNaN(Number(coupon?.totals?.total_discount)) ? Number(coupon?.totals?.total_discount) : 0;
                            const totalDiscountTax = !isNaN(Number(coupon?.totals?.total_discount_tax)) ? Number(coupon?.totals?.total_discount_tax) : 0;
                            const code = coupon?.code ?? "";

                            return (
                                <tr key={i}>
                                    <th>Coupon: {code}</th>
                                    <td>
                                        {totalDiscount + totalDiscountTax > 0 && (
                                            `- ${convertToStringPrice(`${totalDiscount + totalDiscountTax}`, unit, currency)}`
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {shippingRates.length > 0 ? shippingRates.map((item: ShippingRate) => {
                            const itemSelected: ShippingMethod | undefined = item.shipping_rates.find((rate) => rate.selected === true);
                            if (!!itemSelected) {
                                return (
                                    <tr key={`shipping_${item.package_id}`}>
                                        <th >Shipping:
                                            {shippingRates.length > 1 && (
                                                <>
                                                    {" "}{item.name}
                                                </>
                                            )}
                                        </th>
                                        <td>
                                            {getTextShippingRate(itemSelected)}
                                        </td>
                                    </tr>
                                )
                            }
                            
                            return undefined;
                        }) : undefined}
                        {Number(totalTax) > 0 && (
                            <tr>
                                <th>Tax</th>
                                <td>{convertToStringPrice(totalTax, unit, currency)}</td>
                            </tr>
                        )}
                        <tr>
                            <th>TOTAL</th>
                            <td>{convertToStringPrice(totalPrice, unit, currency)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return undefined;
}