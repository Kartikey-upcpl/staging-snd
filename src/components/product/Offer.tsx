import { WcProduct } from "@/lib/typesense/types/wc_product_type";

interface Props {
    wcProduct: WcProduct;
}

export default function Offer({ wcProduct }: Props) {

    const data = wcProduct.acf['snd-acf-offers_app'];

    if (!data) {
        return null;
    }

    return (
        <div
            className=" offer-content"
            dangerouslySetInnerHTML={{ __html: data }}
        />
    );
}