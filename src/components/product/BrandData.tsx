import React from "react";
import Image from "next/image";
const BrandData = (wcProduct: any) => {

    return (
        <>
            {wcProduct &&
                <div className="flex  items-center">
                    <p className="font-bold text-xl">Brand <span>:-</span></p>
                    <Image className="ml-[1rem]" alt="Brand Icon" width={70} height={70} src={wcProduct?.wcProduct[0]?.brand_image} />
                </div>
            }
        </>
    );
};
export default BrandData;