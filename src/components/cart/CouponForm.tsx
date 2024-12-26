'use client';

import { useState, useEffect, useCallback } from "react";
import { classnames } from "@/utlis/classnames";

export function ModalCouponForm({ applyCoupon, loading = false }: { applyCoupon: (code: string) => void, loading: boolean }) {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleForm = useCallback(() => setOpenForm((openForm) => !openForm), []);

    return (
        <>
            <span className="block m-0 mt-2">
                Have a coupon?{" "}
                <button
                    className="inline-block text-red-600"
                    onClick={toggleForm}
                >
                    Click here to enter your code
                </button>
            </span>
            <div
                className={classnames("m-0", {
                    "visible block": openForm,
                    "collapse !hidden": !openForm,
                })}
            >
                <div className="card card-body mt-2">
                    <span>
                        If you have a coupon code, please apply it below.
                    </span>
                    <CouponForm
                        className="mt-2"
                        applyCoupon={applyCoupon}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    )
}

export default function CouponForm({ className, loading = false, applyCoupon } : { className?: string, loading?: boolean, applyCoupon: (code: string) => void}) {
    const [valueCode, setValueCode] = useState<string>("");

    useEffect(() => {
        if (!loading) {
            setValueCode("");
        }
    }, [loading]);

    return (
        <form
            className={`relative ${className}`}
            onSubmit={(e) => {
                e.preventDefault();
                applyCoupon(valueCode);
            }}
        >
            <input
                className="form-control"
                type="text"
                placeholder="Coupon Code"
                value={valueCode}
                onChange={(e) => setValueCode(e.target.value)}
            />
            <input
                className="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4"
                type="submit"
                defaultValue="APPLY COUPON"
            />
        </form>
    );
}