import { OrderPending } from "@/components/checkout/OrderPending";
import CheckoutSteps from "@/components/ui/CheckoutSteps";
import { isApiError } from "@/lib/type-guards";
import { getAddresses, getOrderReceived } from "@/lib/wordpress";
import { Addresses } from "@/lib/wordpress/types";
import { notFound, useSearchParams } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {

    // Validate id, the order id is a number
    const isNumber = /^\d+$/.test(params.id);
    if (!isNumber) return notFound();

    if (!searchParams?.key) return notFound();

    const order = await getOrderReceived({
        order_id: parseInt(params.id),
        key: searchParams.key as string,
        billing_email: searchParams?.email as string | undefined,
    });

    if (isApiError(order)) return notFound();

    const addresses = await getAddresses()

    const dataAddresses: Addresses | undefined = isApiError(addresses) ? undefined : addresses;

    return (
        <main className=" py-5">
            <section className="shop-checkout container py-8 bg-white">
                <OrderPending order={order} addresses={dataAddresses} />
            </section>
        </main>
    )
}