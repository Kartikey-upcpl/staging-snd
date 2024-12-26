import CheckoutSteps from "@/components/ui/CheckoutSteps";
import Cart from "@/components/cart/Cart";
import { cookies } from "next/headers";
import { getAddresses } from "@/lib/wordpress";

export default async function CartPage() {
    const lang = cookies().get('lang')?.value ?? 'en';
    const addressesPromise = getAddresses(lang);
    return (
        <main className="">
            <section className="shop-checkout container py-8 bg-white">
                {/* <h2 className="page-title">Cart</h2> */}
                <CheckoutSteps />
                <Cart addressesPromise={addressesPromise} />
            </section>
        </main>
    );
}