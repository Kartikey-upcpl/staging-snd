import type { Product as ProductType } from "@/lib/typesense/typesense_type";
import { LinkedVariation } from "./util";
import AttributeList from "./AttributeList";
export type { LinkedVariation, LinkedTerm } from "./util";

export default function LinkedVariations({ product }: { product: ProductType }) {
    const { extensions } = product;

    const linked = extensions["linked-variations"];

    if (!linked || linked.length === 0) {
        return null;
    }

    return (
        <>
            {linked.map((variation: LinkedVariation) => {
                return (
                    <div
                        key={variation.attribute.name}
                        className="product-single__swatches"
                    >
                        <div className="product-swatch text-swatches !gap-[1rem]">
                            <label className="wpclv-attribute-label w-full p-2"
                                dangerouslySetInnerHTML={{ __html: variation.attribute.name }}
                            />
                            <div className="swatch-list flex-wrap">
                                <AttributeList
                                    terms={variation.terms}
                                    idProductSelected={product.id}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
