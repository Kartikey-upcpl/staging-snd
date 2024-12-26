import CheckoutContent from "@/components/checkout/CheckoutContent";
import CheckoutSteps from "@/components/ui/CheckoutSteps";
import { getPaymentMethosPublic, getAddresses } from "@/lib/wordpress";

export default async function CheckoutPage() {
    const addresss = getAddresses();
    let paymentMethods = getPaymentMethosPublic();
    return (
        <main className="bg-light py-5">
            <section className="shop-checkout container py-8 bg-white">
                <h2 className="page-title">Shipping and Checkout</h2>
                <CheckoutSteps />
                <CheckoutContent addresssPromise={addresss} paymentMethodsPromise={paymentMethods} />
            </section>
            
        </main>
    )
}