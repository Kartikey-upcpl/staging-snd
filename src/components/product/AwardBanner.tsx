import React from "react";


const AwardBanner = (productData: any) => {

    return (

        <div className="product-details pt-3 ">
            <div dangerouslySetInnerHTML={{ __html: productData?.productData }} />
        </div>
    );
};

export default AwardBanner;