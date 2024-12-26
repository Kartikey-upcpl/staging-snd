import Sidebar from "@/components/account/Sidebar";
import WishlistDashboard from "@/components/account/WishlistDashboard";
import React from "react"

export default function WishlistPage() {
    return (
        <main className="bg-light py-5">
            <section className="my-account container py-8 bg-white">
                <h2 className="page-title">Wishlist</h2>
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-9">
                        <WishlistDashboard />
                        {/* <AddressDashboard /> */}
                    </div>
                </div>
            </section>

        </main>
    );
}