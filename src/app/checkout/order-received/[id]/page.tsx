import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import CheckoutSteps from "@/components/ui/CheckoutSteps";
import { isApiError } from "@/lib/type-guards";
import { getAddresses, getOrderReceived, getOrder } from "@/lib/wordpress";
import { Addresses } from "@/lib/wordpress/types";
import { cookies } from "next/headers";
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

    const orderPromise = getOrder(parseInt(params.id));
    const addressesPromise = getAddresses();

    return (
        <main className="bg-light py-5">
            <section className="shop-checkout container py-8 bg-white">
                <CheckoutSteps />
                <OrderSuccess orderPromise={orderPromise} addressesPromise={addressesPromise} />
            </section>
        </main>
    );
}