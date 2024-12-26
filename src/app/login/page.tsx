import React from "react";
import LogoutAccount from "@/components/account/LogoutAccount";

export default function LoginPage() {
    return (
        <main className="bg-light py-5 bg-white">
            <section className="my-account container-fit py-8 bg-white">
                <h2 className="page-title">My account</h2>
                <LogoutAccount />
            </section>
        </main>
    );
}
