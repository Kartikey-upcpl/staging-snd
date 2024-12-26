'use client';

import React from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch';
import Slider from "rc-slider";
import { convertToStringPrice } from '@/utlis/price';

const unsetNumberInputValue = '';
const unit = 2;
const step = Math.pow(10, 2);
const currency = 'INR';

export default function CustomPrice(props: UseRangeProps) {
    const { start, range, canRefine, refine } = useRange(props);

    const values = {
        min:
            start[0] !== -Infinity && start[0] !== range.min
                ? start[0]
                : unsetNumberInputValue,
        max:
            start[1] !== Infinity && start[1] !== range.max
                ? start[1]
                : unsetNumberInputValue,
    };
    const [prevValues, setPrevValues] = React.useState(values);

    const [{ from, to }, setRange] = React.useState({
        from: values.min?.toString(),
        to: values.max?.toString(),
    });

    if (values.min !== prevValues.min || values.max !== prevValues.max) {
        setRange({ from: values.min?.toString(), to: values.max?.toString() });
        setPrevValues(values);
    }

    return (
        <>
            <div style={{ marginRight: 20 }}>
                <Slider
                    range
                    max={range.max}
                    min={range.min}
                    step={step}
                    value={[
                        Number(stripLeadingZeroFromInput(from || `${range.min}`)),
                        Number(stripLeadingZeroFromInput(to || `${range.max}`))
                    ]}
                    disabled={!canRefine}
                    onChange={(value) => {
                        if (Array.isArray(value) && value.length === 2) {
                            setRange({
                                from: value[0] !== -Infinity && value[0] !== range.min
                                ? value[0]?.toString()
                                : unsetNumberInputValue,
                                to: value[1] !== -Infinity && value[1] !== range.max
                                ? value[1]?.toString()
                                : unsetNumberInputValue,
                            });
                        }
                    }}
                    onChangeComplete={(value) => {
                        if (Array.isArray(value)) {
                            const valueFrom = value[0] !== -Infinity && value[0] !== range.min
                            ? value[0]?.toString()
                            : unsetNumberInputValue;
                            const valueTo = value[1] !== -Infinity && value[1] !== range.max
                            ? value[1]?.toString()
                            : unsetNumberInputValue;

                            refine([valueFrom ? Number(valueFrom) : undefined, valueTo ? Number(valueTo) : undefined]);
                        }
                        
                    }}
                />
            </div>
            <div className="price-range__info d-flex align-items-center mt-2">
                <div className="me-auto">
                    <span className="text-secondary">Min Price: </span>
                    <span className="price-range__min">{convertToStringPrice(`${from || range.min}`, unit, currency)}</span>
                </div>
                <div>
                    <span className="text-secondary">Max Price: </span>
                    <span className="price-range__max">{convertToStringPrice(`${to || range.max}`, unit, currency)}</span>
                </div>
            </div>
        </>
    );
}

function stripLeadingZeroFromInput(value: string): string {
    return value.replace(/^(0+)\d/, (part) => Number(part).toString());
}
