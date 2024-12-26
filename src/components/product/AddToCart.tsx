'use client';

import React from "react";
import Loading from "@/components/ui/Loading";
import { classnames } from "@/utlis/classnames";

interface PropsType {
    qty: number;
    min: number;
    max: number;
    onChangeQty: (value: number) => void;
    availableForSale: boolean;
    onAddCart: () => void;
    loading: boolean;
    textButton?: string | undefined;
}

export default function AddToCart({ qty, min, max, onChangeQty, availableForSale, onAddCart, loading, textButton }: PropsType) {

    return (
        <div className="product-single__addtocart">
            {!availableForSale ? (
                <button
                    type="submit"
                    className="btn btn-primary btn-addtocart btn-outofstock"
                >
                    Out Of Stock
                </button>
            ) : (
                <>
                    <div className="qty-control position-relative">
                        <input
                            type="number"
                            name="quantity"
                            value={qty}
                            min={min}
                            max={max}
                            onChange={(e) => {
                                const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : 1;
                                onChangeQty(value);
                            }}
                            onBlur={() => {
                                if (qty < min) {
                                    onChangeQty(min);
                                } else if (qty > max) {
                                    onChangeQty(max);
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key !== "Backspace" && !/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            className="qty-control__number text-center"
                        />
                        <div
                            onClick={() => {
                                if (qty > min) {
                                    onChangeQty(qty - 1);
                                }
                            }
                            }
                            className={
                                classnames(
                                    "qty-control__reduce",
                                    {
                                        "text-gray-300 cursor-not-allowed": qty <= min
                                    }
                                )
                            }
                        >
                            -
                        </div>
                        <div
                            onClick={() => {
                                if (qty < max) {
                                    onChangeQty(qty + 1)
                                }
                            }
                            }
                            className={
                                classnames(
                                    "qty-control__increase",
                                    {
                                        "text-gray-300 cursor-not-allowed": qty >= max
                                    }
                                )
                            }
                        >
                            +
                        </div>
                    </div>
                    {/* <!-- .qty-control --> */}

                    <button
                        type="submit"
                        className="btn btn-primary btn-addtocart js-open-aside"
                        onClick={onAddCart}
                    >
                        {loading ? <Loading className="spinner-border-sm text-white" /> : textButton ?? "Add to Cart"}
                    </button>
                </>
            )}
        </div>
    );
}
