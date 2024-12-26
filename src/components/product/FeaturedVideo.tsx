import { WcProduct } from "@/lib/typesense/types/wc_product_type";

interface Props {
    wcProduct: WcProduct;
}

export default function FeaturedVideo({ wcProduct }: Props) {

    const featureVideo = wcProduct.acf['cirilla-app-featured-videos'];

    if (!featureVideo) {
        return null;
    }

    return (
        <>
            <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">
                Featured Videos
            </h2>
            <div className="px-4 mb-10 sm:flex sm:justify-center">
                <div className="product-single-description" dangerouslySetInnerHTML={{ __html: featureVideo }} />
            </div>
        </>
    );
}