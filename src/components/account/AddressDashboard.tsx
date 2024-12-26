"use client"
import React, { useEffect, useState } from "react";
import { useCart } from "../cart/cart-context";
import { getUserById } from "../checkout/actions";
import Link from "next/link";
import Loading from "../ui/Loading";

interface Address {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email?: string;
    phone?: string;
}

interface UserDetails {
    id: string;
    billing: Address;
    shipping: Address;
}


export default function AddressDashboard() {
    const { user } = useCart();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    console.log("yseredf", userDetails)
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user?.ID) {
                setError("User ID is missing");
                setLoading(false);
                return;
            }
            try {
                const data = await getUserById(user.ID);
                setUserDetails(data);
            } catch (err) {
                console.error("Failed to fetch user details:", err);
                setError("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user?.ID]);


    if (loading) {
        return <div className="flex justify-center items-center h-44"><Loading /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="page-content my-account__address">
            <p className="mb-6">
                The following addresses will be used on the checkout page by default.
            </p>
            <div className="my-account__address-list">
                <div className="">
                    <p className="text-xl font-semibold text-[#000055] mb-2">
                        Billing address
                    </p>
                    <Link className="font-medium"
                        href={{
                            pathname: "/my-account/edit-address/billing",
                            query: {
                                id: userDetails?.id,
                                billing: JSON.stringify(userDetails?.billing),
                            },
                        }}
                    >
                        Edit Billing Address
                    </Link>
                    <div className="italic">
                        <p>
                            {userDetails?.billing.first_name} {userDetails?.billing.last_name}
                        </p>
                        <p>{userDetails?.billing.address_1}</p>
                        <p>{userDetails?.billing.address_2}</p>

                        <p>
                            {userDetails?.billing.city}
                        </p>
                        <p>
                            {userDetails?.billing.state},
                            {userDetails?.billing.postcode}
                        </p>
                    </div>
                </div>
                <div className="">
                    <p className="text-xl font-semibold text-[#000055] mb-2">
                        Shipping address
                    </p>
                    <Link className="font-medium"
                        href={{
                            pathname: "/my-account/edit-address/shipping",
                            query: {
                                id: userDetails?.id,
                                shipping: JSON.stringify(userDetails?.shipping),
                            },
                        }}
                    >
                        Edit Shipping Address
                    </Link>
                    <div className="italic">
                        <p>
                            {userDetails?.shipping.first_name} {userDetails?.shipping.last_name}
                        </p>
                        <p>{userDetails?.shipping.address_1}</p>
                        <p>{userDetails?.shipping.address_2}</p>
                        <p>
                            {userDetails?.shipping.city}
                        </p>
                        <p>{userDetails?.shipping.state},{userDetails?.shipping.postcode}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}