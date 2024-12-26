'use client';

import React, { useEffect } from "react";

import tippy from "tippy.js";

import { ProductVariations } from "@/lib/wordpress/types";
import { checkExistTermVariation, checkCanSelect } from "./util";

import Image from '@/components/image/Image';

import { classnames } from "@/utlis/classnames";

interface TermListPropsType {
    keyAttribute: string;
    valueSelected: string | undefined;
    variations: ProductVariations;
    onChange: (key: string, value: string) => void;
}

export default function TermList({ keyAttribute, valueSelected, variations, onChange }: TermListPropsType) {
    const attributeTerms: { [key: string]: string[] } = variations.attribute_terms;
    const attributeTermsLabels: { [key: string]: string } = variations.attribute_terms_labels;
    const attributeTermsValues: { [key: string]: { [key: string]: string } } = variations.attribute_terms_values;

    const terms: string[] = attributeTerms?.[keyAttribute] ?? [];
    const filterTerms: string[] = terms.filter((keyTerm) => checkExistTermVariation(keyAttribute, keyTerm, variations.variations));

    return filterTerms.map((keyTerm: string) => {
        return (
            <TermItem
                key={keyTerm}
                label={attributeTermsLabels?.[`${keyAttribute}_${keyTerm}`] ?? keyTerm}
                value={attributeTermsValues?.[`${keyAttribute}_${keyTerm}`]}
                selected={keyTerm === valueSelected}
                canSelect={checkCanSelect(keyTerm, keyAttribute, {}, variations.variations)}
                onSelect={() => onChange(keyAttribute, keyTerm)}
            />
        );
    });
}

interface TermPropsType {
    label: string;
    value: { [key: string]: string } | undefined;
    selected: boolean;
    canSelect: boolean;
    onSelect: () => void;
}

function TermItem({ label, value, selected, canSelect, onSelect }: TermPropsType) {
    useEffect(() => {
        tippy("[data-tippy-content]");
    }, []);

    if (!canSelect) {
        return undefined;
    }

    if (value?.type === "color") {
        return (
            <label
                className={classnames(
                    "swatch swatch-color js-swatch cursor-pointer",
                    {
                        "!border-[#222222]": selected,
                    }
                )}
                aria-label={label}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-tippy-content={label}
                style={{ color: value?.value ?? "transparent" }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!selected) {
                        onSelect();
                    }
                }}
            />
        );
    }

    if (value?.type === "image") {
        return (
            <label
                className={classnames(
                    "swatch swatch-image js-swatch cursor-pointer",
                    {
                        "!border-[#222222]": selected,
                    }
                )}
                aria-label={label}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-tippy-content={label}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!selected) {
                        onSelect();
                    }
                }}
            >
                <Image
                    loading="lazy"
                    src={value?.value}
                    width="60"
                    height="60"
                    alt="image"
                />
            </label>
        );
    }

    return (
        <label
            className={classnames(
                "swatch js-swatch cursor-pointer",
                {
                    "!border-[#222222]": selected,
                }
            )}
            dangerouslySetInnerHTML={{ __html: label }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!selected) {
                    onSelect();
                }
            }}
        />
    );
}