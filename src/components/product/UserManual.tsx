import { WcProduct } from "@/lib/typesense/types/wc_product_type";

import Image from '@/components/image/Image';

interface Props {
    wcProduct: WcProduct;
}

export default function UserManual({  wcProduct }: Props) {

    const data = wcProduct.acf['user_manual'];

    if (!data) {
        return null;
    }

    return(
        <div className="px-4 mb-10">
            <div className="p-4 flex bg-gray-100 rounded-lg items-center shadow-md gap-3">
                <Image
                    src="https://staranddaisy.in/wp-content/uploads/2024/05/user-mannual-icon-lightpink.png"
                    className="w-12"
                    alt="user-mannual-icon"
                />
                <div className="flex-1">
                    <h4 className="text-xl font-semibold">Download user manual</h4>
                    <p className="text-xs">For easy access to product information and get the most out of your product.</p>
                </div>
                <a download={true} className="btn btn-primary" href={`${data}`} target="_blank">Download</a>
            </div>
        </div>
    );
}