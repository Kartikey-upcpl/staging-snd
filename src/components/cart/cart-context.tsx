'use client';

import React, { createContext, use, useCallback, useContext, useMemo, useOptimistic, startTransition } from 'react';
import { uuid } from '@/utlis/strings';
import { logoutAction } from '@/components/cart/actions';
import { useNotifications } from '@/components/ui/Notifications';

import type {
    UpdateQuantityPayload,
    RemoveItemPayload,
    AddToCartPayload,
    AddCouponPayload,
    RemoveCouponPayload,
    UpdateShippingMethodPayload,
    UpdateShippingPayload,
    ShippingRate,
    ShippingMethod,
} from '@/lib/wordpress/types/cart_type';
import type { Cart, UserType } from '@/lib/wordpress/types';

type CartAction =
    { type: 'UPDATE_CART'; payload: Cart | undefined } |
    { type: 'ADD_COUPON'; payload: AddCouponPayload } |
    { type: 'REMOVE_COUPON'; payload: RemoveCouponPayload } |
    { type: 'UPDATE_SHIPPING_METHOD'; payload: UpdateShippingMethodPayload } |
    { type: 'UPDATE_SHIPPING'; payload: UpdateShippingPayload } |
    { type: 'REMOVE_CART_ITEM'; payload: RemoveItemPayload } |
    { type: 'UPDATE_CART_QTY'; payload: UpdateQuantityPayload } |
    { type: 'ADD_TO_CART'; payload: AddToCartPayload };

type CartContextType = {
    cart: Cart | undefined;
    user: UserType | undefined;
    logout: () => void,
    applyCouponCart: (payload: AddCouponPayload) => void,
    removeCouponCart: (payload: RemoveCouponPayload) => void,
    selectShippingMethod: (payload: UpdateShippingMethodPayload) => void,
    updateShipping: (payload: UpdateShippingPayload) => void,
    removeCartItem: (payload: RemoveItemPayload) => void,
    updateCartQty: (payload: UpdateQuantityPayload) => void,
    addToCart: (payload: AddToCartPayload) => void,
    updateCart: (payload: Cart | undefined) => void,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartItemPlaceHolder = {
    "key": "",
    "id": 0,
    "type": "simple",
    "quantity": 1,
    "quantity_limits": {
        "minimum": 1,
        "maximum": 9999,
        "multiple_of": 1,
        "editable": true
    },
    "name": "Loading",
    "short_description": "",
    "description": "Loading",
    "sku": "",
    "low_stock_remaining": null,
    "backorders_allowed": false,
    "show_backorder_badge": false,
    "sold_individually": false,
    "permalink": "Loading",
    "images": [],
    "variation": [],
    "item_data": [],
    "prices": {
        "price": "0",
        "regular_price": "0",
        "sale_price": "0",
        "price_range": null,
        "currency_code": "USD",
        "currency_symbol": "$",
        "currency_minor_unit": 2,
        "currency_decimal_separator": ",",
        "currency_thousand_separator": ".",
        "currency_prefix": "$",
        "currency_suffix": "",
        "raw_prices": {
            "precision": 6,
            "price": "0",
            "regular_price": "0",
            "sale_price": "0"
        }
    },
    "totals": {
        "line_subtotal": "0",
        "line_subtotal_tax": "0",
        "line_total": "0",
        "line_total_tax": "0",
        "currency_code": "USD",
        "currency_symbol": "$",
        "currency_minor_unit": 2,
        "currency_decimal_separator": ",",
        "currency_thousand_separator": ".",
        "currency_prefix": "$",
        "currency_suffix": ""
    },
    "catalog_visibility": "visible",
    "extensions": {}
};

function cartReducer(state: Cart | undefined, action: CartAction): Cart | undefined {
    const currentCart = state;
    if (!currentCart) {
        return currentCart;
    }

    switch (action.type) {
        case "UPDATE_CART":
            return action.payload;
        case "ADD_COUPON":
            return {
                ...currentCart,
                coupons: [
                    ...currentCart.coupons,
                    {
                        code: action.payload.code,
                    }
                ]
            };
        case "REMOVE_COUPON":
            const coupons = currentCart.coupons.filter(item => item.code !== action.payload.code);
            return {
                ...currentCart,
                coupons: coupons,
            };
        case "UPDATE_SHIPPING_METHOD":
            const shippingRates = currentCart.shipping_rates.reduce((result: ShippingRate[], shipping: ShippingRate) => {
                if (shipping.package_id !== action.payload.packageId) {
                    return [...result, shipping];
                }

                return [...result, {
                    ...shipping,
                    shipping_rates: shipping.shipping_rates.map((item: ShippingMethod) => {
                        return {
                            ...item,
                            selected: item.rate_id === action.payload.rateId,
                        }
                    })
                }];
            }, []);
            return {
                ...currentCart,
                shipping_rates: shippingRates
            };
        case "UPDATE_SHIPPING":
            const newShippingRates: ShippingRate[] = currentCart.shipping_rates.reduce((result: ShippingRate[], shipping: ShippingRate) => {
                if (shipping.package_id !== action.payload.packageId) {
                    return [...result, shipping];
                }

                return [...result, {
                    ...shipping,
                    destination: action.payload.address
                }];
            }, []);

            return {
                ...currentCart,
                billing_address: {
                    ...currentCart.billing_address,
                    ...action.payload.address
                },
                shipping_address: {
                    ...currentCart.shipping_address,
                    ...action.payload.address
                },
                shipping_rates: newShippingRates
            };
        case "REMOVE_CART_ITEM":
            const items = currentCart.items.map(item => {
                if (item.key === action.payload.key) {
                    return { ...item, quantity: 0, loading: true };
                }
                return item;
            });
            return { ...currentCart, items };
        case "UPDATE_CART_QTY":
            const itemsUpdate = currentCart.items.map(item => {
                if (item.key === action.payload.key) {
                    return { ...item, quantity: action.payload.quantity, loading: true };
                }
                return item;
            });
            return { ...currentCart, items: itemsUpdate };
        case "ADD_TO_CART":
            const item = currentCart.items.find(item => item.id === action.payload.id);

            let updatedItems = currentCart.items;

            if (item) {
                updatedItems = currentCart.items.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1, loading: true };
                    }
                    return item;
                });
            } else {
                updatedItems = [
                    ...currentCart.items,
                    {
                        ...cartItemPlaceHolder,
                        id: action.payload.id,
                        key: uuid(),
                        loading: true,
                    }
                ];
            }

            return {
                ...currentCart,
                items_count: currentCart.items_count + 1,
                items: updatedItems,
            };
        default:
            return currentCart;
    }
}

function userReducer(state: UserType | undefined, action: any): UserType | undefined {
    if (action.type === "LOGOUT") {
        return undefined;
    }
    return state;
}

export function CartProvider({
    children,
    cartPromise,
    userPromise,
}: {
    children: React.ReactNode;
    cartPromise: Promise<Cart | undefined>;
    userPromise: Promise<UserType | undefined>;
}) {
    const initialCart = use(cartPromise);
    const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

    const initialUser = use(userPromise);
    const [optimisticUser, updateOptimisticUser] = useOptimistic(initialUser, userReducer);

    const { addErrorNotification } = useNotifications();

    const selectShippingMethod = useCallback(async (payload: UpdateShippingMethodPayload) => {
        if (!payload.rateId) {
            addErrorNotification("Missing keys method.");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'UPDATE_SHIPPING_METHOD', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const updateShipping = useCallback(async (payload: UpdateShippingPayload) => {
        startTransition(() => {
            updateOptimisticCart({ type: 'UPDATE_SHIPPING', payload });
        });
    }, [updateOptimisticCart]);

    const applyCouponCart = useCallback(async (payload: AddCouponPayload) => {
        if (!payload.code) {
            addErrorNotification("Missing code coupon.");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'ADD_COUPON', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const removeCouponCart = useCallback(async (payload: RemoveCouponPayload) => {
        if (!payload.code) {
            addErrorNotification("Missing code coupon.");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'REMOVE_COUPON', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const removeCartItem = useCallback((payload: RemoveItemPayload) => {
        if (!payload.key) {
            addErrorNotification("Missing key item product");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'REMOVE_CART_ITEM', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const updateCartQty = useCallback((payload: UpdateQuantityPayload) => {
        if (!payload.key) {
            addErrorNotification("Missing key item product");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'UPDATE_CART_QTY', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const addToCart = useCallback((payload: AddToCartPayload) => {
        if (!payload.id) {
            addErrorNotification("Missing product ID");
        } else {
            startTransition(() => {
                updateOptimisticCart({ type: 'ADD_TO_CART', payload });
            });
        }
    }, [addErrorNotification, updateOptimisticCart]);

    const updateCart = useCallback((payload: Cart | undefined) => {
        startTransition(() => {
            updateOptimisticCart({ type: 'UPDATE_CART', payload });
        });
    }, [updateOptimisticCart]);

    const logout = useCallback(() => {
        startTransition(async () => {
            await logoutAction();
        });
    }, []);

    const value: CartContextType = useMemo(
        () => ({
            cart: optimisticCart,
            user: optimisticUser,
            logout,
            applyCouponCart: applyCouponCart,
            removeCouponCart: removeCouponCart,
            updateShipping: updateShipping,
            selectShippingMethod: selectShippingMethod,
            removeCartItem,
            updateCartQty,
            addToCart,
            updateCart,
        }),
        [
            optimisticCart,
            optimisticUser,
            logout,
            applyCouponCart,
            removeCouponCart,
            updateShipping, selectShippingMethod,
            removeCartItem,
            updateCartQty,
            addToCart,
            updateCart,
        ]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
