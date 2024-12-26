import React from 'react';



interface ACFType {
    technical_details: []
    additional_information: []
}

export type ProductType = {
    acf: ACFType
};
interface Props {
    productDetails: ProductType;
}

interface Technical_Details {
    td_titile: string;
    td_value: string;
}

interface Additional_Info {
    ai_titile: string;
    ai_value: string;
}

const ProductInformation = ({ productDetails }: Props) => {
    const TechnicalDetails = productDetails?.acf?.technical_details as Technical_Details[] | undefined;
    const AdditionalInfo = productDetails?.acf?.additional_information as Additional_Info[] | undefined;

    // Check if any of the fields have data
    const hasTechnicalDetails = TechnicalDetails && TechnicalDetails.length > 0;
    const hasAdditionalInfo = AdditionalInfo && AdditionalInfo.length > 0;

    // Render component only if there is data
    if (!hasTechnicalDetails && !hasAdditionalInfo) {
        return null;
    }

    return (
        <div className="font-sans sm:py-3">
            <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">Product Information</h2>
            <div className="gap-8 w-full">
                <div className="sm:flex w-full sm:space-x-10">
                    {hasTechnicalDetails && (
                        <div className="sm:w-1/2">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">Technical Details</h3>
                            <table className="w-full border-2 border-gray-800">
                                <tbody>
                                    {TechnicalDetails.map((detail, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="p-2 font-semibold bg-gray-100 w-1/2">{detail.td_titile}</td>
                                            <td className="p-2">{detail.td_value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {hasAdditionalInfo && (
                        <div className="sm:w-1/2">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">Additional Information</h3>
                            <table className="w-full border-2 border-gray-800">
                                <tbody>
                                    {AdditionalInfo.map((detail, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="p-2 font-semibold bg-gray-100 w-1/2">{detail.ai_titile}</td>
                                            <td className="p-2">{detail.ai_value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;
