"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-context";
export default function Logout() {
    const { logout } = useCart();
    useEffect(() => {
        logout();
    }, [logout]);
    return null;
}