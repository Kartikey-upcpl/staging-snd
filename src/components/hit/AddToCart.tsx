'use client';

import React, { useMemo, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";

import { classnames } from "@/utlis/classnames";
import { useCart } from "@/components/cart/cart-context";
import { addToCartAction, revalidateTagCart } from "@/components/cart/actions";

import Loading from "@/components/ui/Loading";
import type { AddToCartPayload } from "@/lib/wordpress/types/cart_type";
import type { Document } from '@/lib/typesense/typesense_type';
import type { ActionResponse } from "@/components/cart/actions";
import { useNotifications } from "@/components/ui/Notifications";
import Link from "next/link";
import { ProductTypeSimple } from "@/lib/wordpress/types";

interface AddToCartProps {
    product: Document;
}

export default function AddToCart(props : AddToCartProps ) {    
    const { updateCart } = useCart();
    const { addErrorNotification } = useNotifications();
    const [isPending, startTransition] = useTransition();

    const { product } = props;
    const availableForSale = useMemo(() => product.is_on_backorder || product.is_in_stock, [product]);
    const payload: AddToCartPayload = {
        id: product.rowID,
        // id: 37, // Dev site
        // id: 39,
        quantity: 1,
    };

    const [state, formAction] = useFormState<ActionResponse, AddToCartPayload>(addToCartAction, { message: undefined, cart: undefined });

    useEffect(() => {
        if (state.message) {
            addErrorNotification(state.message);
        }
        if (state.cart) {
            updateCart(state.cart);
            revalidateTagCart();
        }
    }, [state, updateCart, addErrorNotification]);

    const onClick = async () => {
        if (isPending) {
            return;
        }
        startTransition(async () => {
            await formAction(payload);
        });
    };

    if (!availableForSale) {
        return (
            <button
                type="submit"
                className={classnames(
                    "pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside",
                    {
                        "!opacity-50": true
                    }
                )}
                disabled
            >
                Out Of Stock
            </button>
        )
    }

    if (product.type !== ProductTypeSimple) {
        return (
            <Link
                className={"pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"}
                href={`/product/${product.slug}`}
            >
                View product
            </Link>
        );
    }

    return (
        <button
            type="submit"
            className={"pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"}
            onClick={onClick}
        >
            {isPending ? <Loading className="spinner-border-sm" /> : "Add to Cart"}
        </button>
    );
}
