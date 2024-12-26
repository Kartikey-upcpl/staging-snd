import { WcProduct } from "@/lib/typesense/types/wc_product_type";

interface Props {
    wcProduct: WcProduct;
}

export default function ManufacturerImporter({  wcProduct }: Props) {

    const data = wcProduct.acf['snd-importer'];

    if (!data) {
        return null;
    }

    return(
        <div className="px-4 mb-10 product-single-description" dangerouslySetInnerHTML={{ __html: data }} />
    );
}