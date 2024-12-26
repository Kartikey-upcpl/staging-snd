'use client'

import { Fragment, useState, useRef, useEffect, useMemo, use } from 'react';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import type { Item } from '@/lib/wordpress/types';
import { convertToStringPrice } from '@/utlis/price';
import Image from '@/components/image/Image';
import Link from 'next/link';

import { MenuModalPanel, ModalPanel } from '@/components/ui/Modal';
import Shimmer from '@/components/shimmer/Shimmer';

import { useCart } from "@/components/cart/cart-context";
import { initCart, verifyUser } from '@/app/actions';
import { RemoveCartButton } from './RemoveCartButton';
import { QuantityButton } from './QuantityButton';
import GoKWikCheckout from '../checkout/payment-gateways/goquick';

export default function CartModal() {
    const { cart, user, removeCartItem, updateCartQty } = useCart();
    const pathname = usePathname();
    const quantityRef = useRef(cart?.items_count);

    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);


    useEffect(() => {
        if (!cart) {
            initCart();
        }
    }, [cart]);

    useEffect(() => {
        if (!user) {
            verifyUser();
        }
    }, [user]);

    useEffect(() => {
        if (
            quantityRef.current !== undefined &&
            cart?.items_count &&
            cart?.items_count !== quantityRef.current &&
            cart?.items_count > 0
        ) {
            if (!isOpen && pathname !== '/cart') {
                setIsOpen(true);
            }
        }
        quantityRef.current = cart?.items_count;
    }, [isOpen, cart?.items_count, quantityRef, pathname]);

    const loading = useMemo(() => cart && cart.items.length > 0 && cart.items.filter(i => i?.loading).length > 0, [cart]);

    return (
        <>
            <button className='flex items-center' aria-label="Open cart" onClick={openCart}>
                <div className='text-black'>
                    CART / {" "}
                    {!!cart?.items && cart.items.length > 0 ? (
                        <span className="cart-subtotal fw-medium">{convertToStringPrice(cart?.totals?.total_price, cart.totals.currency_minor_unit ?? 0, cart.totals.currency_code ?? "USD")}</span>
                    ) : (
                        <span className="cart-subtotal fw-medium">₹ 0.00</span>

                    )}
                </div>
                <div
                    className="header-tools__item header-tools__cart js-open-aside relative"
                >
                    <svg
                        className="w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="black"
                    >
                        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.82 16h9.36c.78 0 1.46-.55 1.64-1.31L21.72 6H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.45C4.91 16.37 5.39 17 6 17h13v-2H7.82z" />
                    </svg>
                    {typeof cart?.items_count === 'number' && cart.items_count > 0 && (
                        <span
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center"
                        >
                            {cart.items_count}
                        </span>
                    )}
                </div>

            </button>
            <ModalPanel
                isOpen={isOpen}
                title={
                    <>
                        SHOPPING BAG (
                        <span className="cart-amount js-cart-items-count">
                            {cart?.items_count ?? 0}
                        </span>
                        )
                    </>
                }
                onClose={closeCart}
            >
                {!!cart?.items && cart.items.length > 0 ? (
                    <div className="flex-1 py-7 px-10 overflow-y-auto relative">
                        {cart.items.map((elm: Item) => (
                            <Fragment key={elm.key}>
                                <div className="flex relative">
                                    <div className="relative">
                                        <Shimmer className="h-fit w-20 object-cover" loading={elm?.loading} width={80} height={80}>
                                            <Image
                                                loading="lazy"
                                                className="h-fit w-20 object-cover"
                                                width={80}
                                                height={80}
                                                src={elm.images?.[0]?.thumbnail}
                                                alt="image"
                                            />
                                        </Shimmer>
                                    </div>
                                    <div className="cart-drawer-item__info flex-1">
                                        <Shimmer tag="h6" className="cart-drawer-item__title fw-normal" loading={elm?.loading && elm.name == 'Loading'} width={150} height={21}>
                                            <h6 className="cart-drawer-item__title fw-normal" dangerouslySetInnerHTML={{ __html: elm.name }} />
                                        </Shimmer>
                                        {elm.variation.length > 0 && elm.variation.map((v, i) => (
                                            <p key={i} className="cart-drawer-item__option text-secondary">
                                                {v.attribute}: {v.value}
                                            </p>
                                        ))}
                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                            <QuantityButton item={elm} optimisticUpdate={updateCartQty} type="model" />
                                            <span className="cart-drawer-item__price money price">
                                                {convertToStringPrice(elm.prices?.price ?? "0", elm.prices?.currency_minor_unit ?? 0, elm.prices?.currency_code ?? "USD")}
                                            </span>
                                        </div>
                                    </div>
                                    <RemoveCartButton item={elm} optimisticUpdate={removeCartItem} type="model" />
                                </div>

                                <hr className="cart-drawer-divider" />
                            </Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        Your cart is empty. Start shopping!
                    </div>
                )}
                <div className="mx-10 mb-6">

                    {/* <!-- /.d-flex justify-content-between --> */}
                    {!!cart?.items && cart.items.length > 0 ? (
                        <>
                            <hr className="cart-drawer-divider" />
                            <div className="d-flex justify-content-between">
                                <h6 className="fs-base fw-medium">SUBTOTAL:</h6>
                                <Shimmer loading={loading} width={100} height={21}>
                                    <span className="cart-subtotal fw-medium">{convertToStringPrice(cart.totals.total_price, cart.totals.currency_minor_unit ?? 0, cart.totals.currency_code ?? "USD")}</span>
                                </Shimmer>
                            </div>
                            <Link href="/cart"
                                className={clsx("btn btn-light mt-3 d-block", { disabled: loading })}
                                onClick={closeCart}
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/checkout"
                                className={clsx("btn btn-primary mt-3 d-block", { disabled: loading })}
                                onClick={closeCart}
                            >
                                Checkout
                            </Link>
                            <div className="mt-3 d-block btn btn-primary">
                                <GoKWikCheckout userId={user?.ID} />
                            </div>
                        </>
                    ) : (
                        <Link href="/collections" className="btn btn-light mt-3 d-block" onClick={closeCart}>
                            Explore shop
                        </Link>
                    )}
                </div>
            </ModalPanel>

        </>
    );
}