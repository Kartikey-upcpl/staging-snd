"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

export default function Welcome() {
    const { user } = useCart();

    return (
        <div className="page-content my-account__dashboard">
            <p>
                Hello <strong>{user?.user_login}</strong> (not <strong>{user?.user_login}?</strong>{" "}
                <Link href="/my-account/logout" className="hover:underline">Log out</Link>)
            </p>
            <p className="mt-2">
                From your account dashboard you can view your{" "}
                <Link className="unerline-link" href="/my-account/order">
                    recent orders
                </Link>{" "}
                , manage your{" "}
                <Link className="unerline-link" href="/my-account/edit-address">
                    shipping and billing addresses
                </Link>{" "}
                , and{" "}
                <Link className="unerline-link" href="/my-account/edit-account">
                    edit your password and account details.
                </Link>
            </p>
        </div>
    );
}