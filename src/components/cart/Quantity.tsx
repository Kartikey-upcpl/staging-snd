'use client';

import { useEffect, useState, useCallback } from 'react';

import { classnames } from '@/utlis/classnames';

export default function Quantity({ qty, onChange, min = 1, max = 9999, loading = false }: {
    qty: number,
    onChange: (value: number) => void,
    min?: number,
    max?: number,
    loading: boolean,
}) {

    const [value, setValue] = useState(qty);

    useEffect(() => {
        if (qty !== value) {
            setValue(qty);
        }
    }, [qty]);

    useEffect(() => {
        if (!loading && qty !== value) {
            setValue(qty);
        }
    }, [loading]);

    const onChangeQty = useCallback((newValue: number) => {
        if (!loading && newValue !== qty) {
            onChange(newValue);
        }
    }, [qty, loading, onChange]);

    const onMin = useCallback(() => {
        if (!loading && value > min) {
            const newValue = value - 1;
            setValue(newValue);
            onChangeQty(newValue);
        }
    }, [value, min, loading, onChangeQty]);

    const onMax = useCallback(() => {
        if (!loading && value < max) {
            const newValue = value + 1;
            setValue(newValue);
            onChangeQty(newValue);
        }
    }, [value, max, loading, onChangeQty]);

    return (
        <div className=" border-2 rounded-lg flex px-1 space-x-4">
            <div
                className={classnames(
                    'flex items-center justify-center  cursor-pointer',
                    {
                        "cursor-not-allowed text-gray-300": value <= min,
                    }
                )}
                onClick={onMin}
            >
                -
            </div>
            <div>
                <div
                    // type="number"
                    // name="quantity"
                    // value={value}
                    // onChange={(e) => {
                    //     if (!loading) {
                    //         const newValue = e.target.value !== "" ? Number(e.target.value) : 0;
                    //         if (newValue <= 0) {
                    //             setValue(1);
                    //         } else {
                    //             if (newValue > max) {
                    //                 setValue(max);
                    //             } else {
                    //                 setValue(newValue);
                    //             }
                    //         }
                    //     }
                    // }}
                    onBlur={(_) => {
                        onChangeQty(value);
                    }}
                    // onKeyDown={(event) => {
                    //     if (event.key !== "Backspace" && !/[0-9]/.test(event.key)) {
                    //         event.preventDefault();
                    //     }
                    // }}
                    // min={min}
                    // max={max}
                    className="text-center"
                >{value}
                </div>
            </div>
            <div
                className={classnames(
                    'flex items-center justify-center cursor-pointer',
                    {
                        "cursor-not-allowed text-gray-300": value >= max,
                    }
                )}
                onClick={onMax}
            >
                +
            </div>
        </div >
    );
}