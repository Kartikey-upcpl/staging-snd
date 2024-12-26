"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/cart-context";

type NavItem = {
    id: number;
    href: string;
    title: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useCart();

    const sidebar: NavItem[] = [
        {
            id: 1,
            href: "/my-account",
            title: "Dashboard",
        },
        {
            id: 2,
            href: "/my-account/orders",
            title: "Orders",
        },
        {
            id: 3,
            href: "/my-account/edit-address",
            title: "Addresses",
        },
        {
            id: 4,
            href: "/my-account/woo-wallet",
            title: "My Walet",
        },
        {
            id: 5,
            href: "/my-account/edit-account",
            title: "Account Details",
        },
        {
            id: 6,
            href: "/wishlist",
            title: "Wishlist",
        },
        {
            id: 7,
            href: "/my-account/logout",
            title: "Logout",
        },
    ];

    return (
        <div className="col-lg-3">
            <ul className="account-nav">
                {sidebar.map((elm, i) => (
                    <li key={i}>
                        <Link
                            href={elm.href}
                            onClick={elm.onClick}
                            className={`menu-link menu-link_us-s ${pathname == elm.href ? "menu-link_active" : ""} `}>
                            {elm.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}