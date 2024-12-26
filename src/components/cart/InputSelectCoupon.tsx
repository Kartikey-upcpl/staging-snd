'use client';

import { useState, useCallback } from "react";
import Image from '@/components/image/Image';
import { classnames } from "@/utlis/classnames";

export default function InputSelectCoupon({ couponsSelected, couponList, applyCoupon }: { couponsSelected: any[], couponList: any[], applyCoupon: (code: string) => void }) {
    const [ openList, setOpenList ] = useState<boolean>(false);
    const toggleList = useCallback(() => setOpenList((openList) => !openList), []);

    return (
        <>
            <div className="relative">
                <button className="m-0 form-control flex items-center" onClick={toggleList}>
                    <span className="flex-1 text-start text-xs">
                        {couponsSelected.length > 0 ? (
                            <>
                                Coupon Code:{" "}
                                {couponsSelected.map((c) => c.code).join(", ")}
                            </>
                        ) : "Select a Coupon"}
                    </span>
                    {couponsSelected.length < 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </button>
                <div
                    className={classnames(
                        "",
                        {
                            "hidden": !openList,
                            "absolute !top-[65px] left-0 right-0 max-h-48 shadow-lg bg-white overflow-y-auto z-[9999] p-4": openList
                        }
                    )}
                >
                    <h4 className="block m-0 text-lg font-semibold">Hand picked offers!</h4>
                    {couponList.map((coupon) => {
                        const amount = coupon.is_percent ? `${coupon.coupon_amount}${coupon.amount_symbol}` : `${coupon.amount_symbol}${coupon.coupon_amount}`;
                        return (
                            <button
                                key={coupon.coupon_code}
                                className="m-0 mt-3 block bg-gray-100 shadow-md hover:bg-red-100 w-full"
                                onClick={() => {
                                    toggleList();
                                    applyCoupon(coupon.coupon_code)
                                }}
                            >
                                <div className="flex gap-3 p-3">
                                    <div className="flex-1 text-start">
                                        <h5 className="text-lg font-semibold text-red-600">{coupon.discount_type} {amount}</h5>
                                        <span
                                            className="text-xs font-light"
                                            dangerouslySetInnerHTML={{ __html: coupon.coupon_description }}
                                        />
                                    </div>
                                    <Image
                                        loading="lazy"
                                        className="object-contain"
                                        width={50}
                                        height={50}
                                        src={coupon.thumbnail_src}
                                        alt="image"
                                    />
                                </div>
                                <div className="flex gap-1 items-center bg-red-600 py-1 px-3 text-white font-light text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                                    </svg>


                                    <span className="flex-1 text-start uppercase">{coupon.coupon_code}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                                    </svg>
                                    <span>{coupon.coupon_expiry}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    )
}