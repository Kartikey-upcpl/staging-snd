import { ProductVariations, ProductVariationsItem } from "@/lib/wordpress/types";
import type { WcProduct } from "@/lib/typesense/types";

export function checkExistTermVariation(keyAttribute: string, keyTerm: string, variations: ProductVariationsItem[]) {
    return variations.some((v) => {
        const attributes: { [key: string]: string } = v.attributes;
        return Object.keys(attributes).some((key) => {
            if (attributes[key] === '') {
                return true;
            }
            return key === keyAttribute && attributes[key] === keyTerm;
        });
    });
}

export function checkCanSelect(keyTerm: string, keyAttribute: string, selected: { [key: string]: string }, variations: ProductVariationsItem[]): boolean {
    if (Object.keys(selected).length < 1) {
        return true;
    }

    // Pre data if select the term
    const dataSelected: { [key: string]: string } = {
        ...selected,
        [keyAttribute]: keyTerm,
    };

    return variations.some((v) => {
        const attributes = v.attributes;
        return Object.keys(dataSelected).every((key) => {
            return attributes[key] === null || attributes[key] === '' || attributes[key] === selected[key];
        });
    });
}

export function getInitSelected(product: WcProduct, variations: ProductVariations): { [key: string]: string } {
    var selectData: { [key: string]: string } = {};

    if (product.default_attributes.length > 0) {
        for (const att of product.default_attributes!) {
            const idAttr: number = att.id
            const valueAttr: string = att.option;

            const keyAttr: string | undefined = Object.keys(variations.attribute_ids).find((key: string) => variations.attribute_ids[key] === idAttr);

            if (!!keyAttr) {
                selectData[keyAttr] = valueAttr;
            }
        }

        const variationSelected: ProductVariationsItem | undefined = variations.variations.find((p) => {
            const attributes = p.attributes;
            return Object.keys(selectData).every((key) => {
                return attributes[key] === null || attributes[key] === '' || attributes[key] === selectData[key];
            })
        });

        const idSelected = variationSelected?.id;
        if (!idSelected) {
            selectData = {};
            const variation: ProductVariationsItem | undefined = variations.variations[0];
            if (!!variation?.attributes) {
                selectData = variation?.attributes;
            }
        }

    }

    return selectData;
}

export function getProductSelected(selectData: {[key: string]: string}, variations: ProductVariations): ProductVariationsItem | undefined {
    if (Object.keys(selectData).length < 1) {
        return undefined;
    }

    const variationSelected: ProductVariationsItem | undefined = variations.variations.find((p) => {
        const attributes = p.attributes;
        return Object.keys(selectData).every((key) => {
            return attributes[key] === null || attributes[key] === '' || attributes[key] === selectData[key];
        })
    });

    return variationSelected;
}