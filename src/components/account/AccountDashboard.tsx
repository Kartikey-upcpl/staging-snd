import React from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function AccountDashboard() {
    return (
        <div className="row">
            <Sidebar />
            <div className="col-lg-9">
                <div className="page-content my-account__dashboard">
                    <p>
                        Hello <strong>alitfn58</strong> (not <strong>alitfn58?</strong>{" "}
                        <Link href="/login_register" className="hover:underline">Log out</Link>)
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
            </div>
        </div>
    );
}