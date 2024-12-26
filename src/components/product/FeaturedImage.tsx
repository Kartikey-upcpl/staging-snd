"use client"
import { WcProduct } from "@/lib/typesense/types/wc_product_type";
import React, { useState } from "react";

interface Props {
    wcProduct: WcProduct;
}

export default function FeaturedImage({ wcProduct }: Props) {
    const featureImage = wcProduct.acf['cirilla-app-featured-images'];
    const Importerdata = wcProduct.acf['snd-importer'];
    const UseMannualData = wcProduct.acf['user_manual'];


    const [showAll, setShowAll] = useState(false);

    if (!featureImage) {
        return null;
    }

    // Determine container height based on state
    const containerHeight = showAll ? "100%" : "150rem"; // Initial height set to 150px

    const handleExpand = () => {
        setShowAll(true); // Directly expand to full content on the first click
    };

    return (
        <>
            <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">
                Featured Images
            </h2>
            <div className="px-4 mb-10">
                <div
                    className="product-single-description overflow-hidden"
                    style={{ height: containerHeight, transition: "height 0.3s ease" }}
                    dangerouslySetInnerHTML={{ __html: featureImage }}
                />
                <div className="flex justify-center">
                    {!showAll && (
                        <button
                            className="mt-4 text-blue-600 font-semibold"
                            onClick={handleExpand}
                        >
                            Show All
                        </button>
                    )}
                </div>
                <div className="px-4 mb-10 product-single-description py-1" dangerouslySetInnerHTML={{ __html: Importerdata || "" }} />
                <div className="px-4 mb-10 py-1">
                    <div className="p-4 flex bg-gray-100 rounded-lg items-center shadow-md gap-3">
                        <img
                            src="https://staranddaisy.in/wp-content/uploads/2024/05/user-mannual-icon-lightpink.png"
                            className="w-12"
                            alt="user-mannual-icon"
                        />
                        <div className="flex-1">
                            <h4 className="text-xl font-semibold">Download user manual</h4>
                            <p className="text-xs">For easy access to product information and get the most out of your product.</p>
                        </div>
                        <a download={true} className="btn btn-primary" href={`${UseMannualData}`} target="_blank">Download</a>
                    </div>
                </div>

            </div>
        </>
    );
}
