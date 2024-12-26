"use client";

import Link from "next/link";
import { use, useCallback, useMemo, useState } from "react";
import Image from '@/components/image/Image';
import type { Address, Addresses, Cart, Item, ShippingRate, TaxLine } from '@/lib/wordpress/types';
import { convertToStringPrice } from '@/utlis/price';
import { useCart } from "./cart-context";

import Loading from "@/components/ui/Loading";
import ShippingMethodCompoment from "./ShippingMethod";
import ShippingAddress from "./ShippingAddress";
import { RemoveCartButton } from "./RemoveCartButton";
import { QuantityButton } from "./QuantityButton";
import { AddCouponInput } from "./AddCouponInput";
import { RemoveCouponButton } from "./RemoveCouponButton";
import ButtonModalAddress from "./ButtonModalAddress";
import { ApiError, isApiError } from "@/lib/type-guards";
import GoKWikCheckout from "../checkout/payment-gateways/goquick";

const LoadingView = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center backdrop-opacity-60 bg-white/50">
            <Loading />
        </div>
    )
}

const getPathUrlProduct = (url: string) => {
    const slug = url.split("/product/")?.[1] ?? "";

    return !!slug ? `/product/${slug}` : "#";
};

type StatusLoadingType = {
    type: "add-item" | "update-quantity" | "remove-item" | "update-address-shipping" | "update-method-shipping" | "add-coupon" | "select-coupon" | "remove-coupon",
    value: string,
}

export default function Cart({ addressesPromise }: { addressesPromise: Promise<Addresses | ApiError> }) {
    const addresses = use(addressesPromise);
    const {
        user,
        cart,
        updateCartQty,
        applyCouponCart,
        removeCouponCart,
        updateShipping,
        selectShippingMethod,
        removeCartItem,
    } = useCart();

    const items: Item[] = useMemo(() => cart?.items ?? [], [cart]);
    console.log("elem", items)
    const coupons: any[] = useMemo(() => cart?.coupons ?? [], [cart]);
    const couponList: any[] = useMemo(() => Array.isArray(cart?.extensions?.["smart-coupon"]) ? cart.extensions["smart-coupon"] : [], [cart]);
    const shippingRates: ShippingRate[] = useMemo(() => cart?.shipping_rates ?? [], [cart]);
    const taxLines: TaxLine[] = useMemo(() => cart?.totals?.tax_lines ?? [], [cart]);

    const totalItems: string = useMemo(() => cart?.totals?.total_items ?? "0", [cart]);
    const totalItemsTax: string = useMemo(() => cart?.totals?.total_items_tax ?? "0", [cart]);
    const totalTax: string = useMemo(() => cart?.totals?.total_tax ?? "0", [cart]);
    const totalPrice: string = useMemo(() => cart?.totals?.total_price ?? "0", [cart]);

    const unit: number = useMemo(() => cart?.totals?.currency_minor_unit ?? 0, [cart]);
    const currency: string = useMemo(() => cart?.totals?.currency_code ?? "USD", [cart]);

    const dataAddresses: Addresses | undefined = isApiError(addresses) ? undefined : addresses;

    return (
        <div className="pt-16 sm:flex relative sm:space-x-10" >
            <div className="sm:w-3/5">
                {items.length > 0 ? (
                    <>
                        <div className="w-full">
                            <div className="w-full flex font-semibold">
                                <div className="w-1/2 ">Product</div>
                                <div className="w-1/2  flex sm:justify-around justify-end">
                                    <div className="sm:flex hidden">Price</div>
                                    <div className="">Quantity</div>
                                    <div className="sm:flex hidden">Subtotal</div>
                                </div>
                            </div>
                            <hr className="font-semibold" />
                            <div className="p-1">
                                {items.map((elm: Item) => (
                                    <div key={elm.key} className="flex border-b-2 py-2">
                                        <div className="w-1/2 flex">
                                            <Link className="flex" href={getPathUrlProduct(elm.permalink)}>
                                                <Image
                                                    loading="lazy"
                                                    src={elm.images?.[0]?.thumbnail}
                                                    width={80}
                                                    height={80}
                                                    alt="image"
                                                />
                                            </Link>
                                            <p className="text-xs w-full line-clamp-4 ml-2" dangerouslySetInnerHTML={{ __html: elm.name }} />
                                        </div>
                                        <div className="flex w-1/2 justify-between items-center">
                                            <div className="hidden">
                                                {elm.variation.length > 0 && (
                                                    <ul className="shopping-cart__product-item__options">
                                                        {elm.variation.map((v, i) => (
                                                            <li key={i}>{v.attribute}: {v.value}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className="sm:ml-0 ml-2">
                                                <span className=" mr-6">
                                                    {convertToStringPrice(elm.prices?.price ?? "0", elm.prices?.currency_minor_unit ?? 0, elm.prices?.currency_code ?? "USD")}
                                                </span>
                                            </div>
                                            <div>
                                                <QuantityButton item={elm} optimisticUpdate={updateCartQty} type="model" />
                                            </div>
                                            <div className="sm:flex hidden">
                                                <span className="shopping-cart__subtotal">
                                                    {convertToStringPrice(`${Number(elm.prices?.price ?? 0) * elm.quantity}`, elm.prices?.currency_minor_unit ?? 0, elm.prices?.currency_code ?? "USD")}
                                                </span>
                                            </div>
                                            <div className="">
                                                <RemoveCartButton item={elm} optimisticUpdate={removeCartItem} type='cart' />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {couponList.length < 1 && (
                            <div className="cart-table-footer">
                                <AddCouponInput
                                    coupons={couponList}
                                    couponList={[]}
                                    optimisticUpdate={applyCouponCart}
                                />
                            </div>
                        )}

                    </>
                ) : (
                    <div>
                        <div className="fs-20">Shop cart is empty</div>
                        <Link href={"/collections"} className="btn mt-3 btn-light">Explore Products</Link>
                    </div>
                )}
            </div>
            {items.length > 0 ? (
                <div className="sm:w-2/5 w-full">
                    <div className="" >
                        <div className="border-2 p-2 rounded-lg">
                            {couponList.length > 0 && (
                                <>
                                    <p className="font-semibold text-[#000055]">Available Coupons</p>
                                    <div className="h-px bg-gray-800" />
                                    <div className="py-2">
                                        <AddCouponInput
                                            coupons={coupons}
                                            couponList={couponList}
                                            optimisticUpdate={applyCouponCart}
                                        />
                                    </div>
                                </>
                            )}
                            <p className="font-semibold mt-2">Cart Totals</p>
                            <div className="h-px bg-gray-800" />
                            <div className="space-y-2 py-2">
                                <div className="flex justify-between">
                                    <div className="">Subtotal</div>
                                    <div className="font-semibold">
                                        {convertToStringPrice(`${Number(totalItems) + Number(totalItemsTax)}`, unit, currency)}
                                    </div>
                                </div>
                                {coupons.length > 0 && coupons.map((coupon: any, i: number) => {
                                    const totalDiscount = !isNaN(Number(coupon?.totals?.total_discount)) ? Number(coupon?.totals?.total_discount) : 0;
                                    const totalDiscountTax = !isNaN(Number(coupon?.totals?.total_discount_tax)) ? Number(coupon?.totals?.total_discount_tax) : 0;
                                    const code = coupon?.code ?? "";

                                    return (
                                        <div key={i} className="flex justify-between bg-green-100">
                                            <div className="">Coupon: {code}</div>
                                            <div>
                                                <div className="flex items-center">

                                                    <span className="flex-1 font-semibold mr-2">
                                                        {totalDiscount + totalDiscountTax > 0 && (
                                                            `- ${convertToStringPrice(`${totalDiscount + totalDiscountTax}`, unit, currency)}`
                                                        )}
                                                    </span>
                                                    <RemoveCouponButton coupon={coupon} optimisticUpdate={removeCouponCart} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {shippingRates.length === 1 ? (
                                    <div className="flex justify-between items-center">
                                        <div className="">Shipping</div>
                                        <div>
                                            <div className="text-end">
                                                <ShippingMethodCompoment
                                                    data={shippingRates[0]}
                                                    optimisticUpdate={selectShippingMethod}
                                                />
                                            </div>
                                            <div className="text-end">
                                                <ShippingAddress
                                                    address={shippingRates[0].destination}
                                                    addresses={dataAddresses}
                                                />
                                            </div>
                                            <div className="text-end">
                                                <ButtonModalAddress
                                                    packageId={shippingRates[0].package_id}
                                                    address={shippingRates[0].destination}
                                                    optimisticUpdate={updateShipping}
                                                    addresses={dataAddresses}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : undefined}
                                {Number(totalTax) > 0 && (
                                    <div className="flex justify-between">
                                        <div className="">Tax</div>
                                        <div>{convertToStringPrice(totalTax, unit, currency)}</div>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <div className="">Total</div>
                                    <div>
                                        <strong className="block m-0 text-end">
                                            {convertToStringPrice(totalPrice, unit, currency)}
                                        </strong>
                                        <p>inclusive of all taxes.</p>
                                        {taxLines.length > 0 && (
                                            <span className="block m-0 mt-1 text-xs text-green-600 font-light">
                                                (includes {taxLines.map((tax, i) => {
                                                    return (
                                                        <span key={i}>
                                                            <strong className="text-gray-900 font-bold">
                                                                {convertToStringPrice(tax.price, unit, currency)}
                                                            </strong> {tax.name}
                                                            {i < taxLines.length - 1 && (
                                                                ", "
                                                            )}
                                                        </span>
                                                    );
                                                })})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-800" />
                            <div className="space-y-2 mt-6">
                                <div className="">
                                    <Link href="/checkout" className="flex bg-green-600 text-white rounded-md p-2 text-center justify-center items-center border border-black">
                                        PROCEED TO CHECKOUT
                                    </Link>
                                </div>
                                <div className="flex bg-green-600 text-white rounded-md p-2 text-center justify-center items-center border border-black">
                                    <GoKWikCheckout userId={user?.ID} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                ""
            )
            }
        </div >
    );
}
