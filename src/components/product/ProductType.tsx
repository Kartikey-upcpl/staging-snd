'use client'
import React, { use, useEffect, useMemo, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { ActionResponse, addToCartAction, revalidateTagCart } from "@/components/cart/actions";

import { ProductTypeVariable } from "@/lib/wordpress/types";
import type { ProductVariations, ProductVariationsItem } from "@/lib/wordpress/types";
import type { Product as ProductType } from "@/lib/typesense/typesense_type";
import type { WcProduct } from "@/lib/typesense/types";

import type { AddToCartPayload, AddToCartVariation } from "@/lib/wordpress/types/cart_type";

import { useCart } from "@/components/cart/cart-context";
import { useNotifications } from "@/components/ui/Notifications";

import AddToCart from "./AddToCart";
import Variable from "./variable";
import { getProductSelected, getInitSelected } from "./variable/util";
import { ApiError, isApiError } from "@/lib/type-guards";

export default function ProductTypeContent({ product, wcProduct, productVariationsPromise }: { product: ProductType, wcProduct: WcProduct, productVariationsPromise: Promise<ProductVariations | ApiError> | undefined }) {

    const { updateCart } = useCart();
    const { addSuccessNotification, addErrorNotification } = useNotifications();
    
    const variations: ProductVariations | ApiError | undefined = productVariationsPromise ? use(productVariationsPromise): undefined;
    
    const [variationSelected, setVariationSelected ] = useState<{[key: string]: string}>( variations && !isApiError(variations) ? getInitSelected( wcProduct, variations) : {}); 
    const [qty, setQty ] = useState<number>(product.add_to_cart.minimum); 

    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useFormState<ActionResponse, AddToCartPayload>(addToCartAction, { message: undefined, cart: undefined });

    useEffect(() => {
        if (state.cart || state.message) {
            updateCart(state.cart);
            revalidateTagCart();
        }
        if (state.message) {
            addErrorNotification(state.message);
        }

        // if (state.cart) {
        //     addSuccessNotification(`Add "${product.name}" successfully.`, {
        //         text: "View cart",
        //         href: "/cart"
        //     });
        // }

    }, [state, product.name, updateCart, addErrorNotification, addSuccessNotification]);

    const productVariationSelected: ProductVariationsItem | undefined = useMemo(() => variations && !isApiError(variations) ? getProductSelected(variationSelected, variations as ProductVariations) : undefined, [variationSelected, variations]);

    const availableForSale = useMemo(() => {
        if (product?.type === ProductTypeVariable && !!productVariationSelected) {
            return productVariationSelected.stock_status !== 'outofstock';
        }
        return product?.is_on_backorder === true || product?.is_in_stock === true;
    }, [product, productVariationSelected]);

    const maxQty: number = useMemo(() => {
        if (product?.type === ProductTypeVariable && !!productVariationSelected) {
            return productVariationSelected.stock_quantity !== null && productVariationSelected.stock_quantity > 0 ? productVariationSelected.stock_quantity ?? product.add_to_cart.maximum : product.add_to_cart.maximum;
        }
        return product.add_to_cart.maximum;
    }, [product, productVariationSelected]);

    const onAddCart = async () => {
        if (qty <= maxQty) {
            var payload: AddToCartPayload = {
                id: product.id,
                quantity: qty,
            };
            if (product.type === ProductTypeVariable) {
                if (variations && !isApiError(variations)) {
                    
                    if (!!productVariationSelected) {
                        const dataVariation: AddToCartVariation[] = Object.keys(variationSelected).reduce((result: AddToCartVariation[], key: string) => {
                            const isInlineAttribute: boolean = variations.attribute_ids[key] === 0;
                            return [
                                ...result,
                                {
                                    attribute: isInlineAttribute ? variations.attribute_labels[key]: key,
                                    value: variationSelected[key],
                                }
                            ];
                        }, []); 
                        payload["variation"] = dataVariation;
                    } else {
                        addErrorNotification("Please select some product options before adding this product to your cart.");
                        return;
                    }
                } else {
                    addErrorNotification("Get variations error.");
                    return;
                }
            }
            
            // const submit = formAction.bind(null, payload);
            // addToCart(payload);

            // await submit();
            
            startTransition(async () => {
                await formAction(payload);
            });

        } else {
            addErrorNotification(`There are only ${maxQty} quantity remaining for this item!`);
            return;
        }
    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                {isApiError(variations) ? (
                    <p className="text-xs text-red-500 mb-[1.875rem]">
                        {variations.message}
                    </p>
                ) : product.type === ProductTypeVariable && variations && (
                    <Variable
                        variations={variations as ProductVariations}
                        data={variationSelected}
                        onChange={setVariationSelected}
                        onClear={() => setVariationSelected(getInitSelected(wcProduct, variations))}
                        currencyCode={product.prices.currency_code}
                        currencySymbol={product.prices.currency_symbol}
                    />
                )}
                <AddToCart
                    qty={qty}
                    min={product.add_to_cart.minimum}
                    max={maxQty}
                    onChangeQty={setQty}
                    availableForSale={availableForSale}
                    loading={isPending}
                    onAddCart={isPending ? () => {} : onAddCart}
                />
            </form>
        </>
    );
}
