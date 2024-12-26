'use client';
import React, { useCallback, useMemo } from "react";

import { ProductVariations, ProductVariationsItem } from "@/lib/wordpress/types";

import TermList from "./TermList";
import { getProductSelected } from "./util";
import { convertPriceHtml, convertToStringPrice } from "@/utlis/price";

interface PropsType {
    data: {[key: string]: string};
    onChange: (data: {[key: string]: string}) => void;
    variations: ProductVariations;
    onClear: () => void;
    currencyCode: string;
    currencySymbol: string;
}
export default function Variable({ variations, data, onChange, onClear, currencyCode, currencySymbol }: PropsType) {

    const onChangeSelected = useCallback((key: string, value: string) => {
        const newData: {[key: string]: string} = {
            ...data,
            [key]: value,
        }
        
        onChange(newData);
        
    }, [data, onChange]);

    const labels: { [key: string]: string } = variations.attribute_labels;

    const productSelected: ProductVariationsItem | undefined = useMemo(() => getProductSelected(data, variations), [data, variations]);
    
    return (
        <>
            <div className="flex justify-end mb-2">
                <button
                    className="uppercase text-xs text-gray-400"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClear();
                    }}
                >
                    Clear</button>
            </div>
            {Object.keys(labels).map((keyAttribute: string) => {
                return (
                    <div key={keyAttribute} className="product-single__swatches">
                        <div className="product-swatch text-swatches color-swatches">
                            <label dangerouslySetInnerHTML={{ __html: labels[keyAttribute] }} />
                            <div className="swatch-list flex-wrap">
                                <TermList
                                    keyAttribute={keyAttribute}
                                    variations={variations}
                                    valueSelected={data[keyAttribute]}
                                    onChange={onChangeSelected}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
            {!!productSelected && (
                <p className="mb-[1.875rem] product-summary">Subtotal: <span className="woocommerce-Price-amount amount" dangerouslySetInnerHTML={{ __html: convertPriceHtml(Number(productSelected.price), currencyCode, currencySymbol) }} /></p>
            )}
        </>
    )
}