"use client"
import { initializeIntercom, waitForIntercom } from "@/components/bottombar/component/loadIntercomSdk";
import Link from "next/link";
import React, { useState } from "react";

const SupportPage = () => {

    const [isLoading, setLoading] = useState(false); // State to manage loading
    const handleChatMessage = async (message: string) => {
        setLoading(true); // Start loading
        initializeIntercom(); // Initialize Intercom
        await waitForIntercom(); // Wait until Intercom is ready
        setLoading(false); // Stop loading
        window.Intercom?.("showNewMessage", message);
    };

    return (
        <div className="row items-center align-middle container-fit">

            <p className="text-2xl	text-[#000055] text-center font-medium	">Customer Support – StarAndDaisy</p>
            {/* Left Image Section */}
            <div className="col-sm-12 col-lg-7">
                <img
                    src="http://test.snd.in/wp-content/uploads/2022/07/supportpage_7522.png"
                    className="inline-block h-auto max-w-full"
                    loading="lazy"
                    alt="Support Page"
                    style={{ margin: "auto", display: "block" }}
                />
            </div>

            {/* Right Contact Section */}
            <div className="col-sm-12 col-lg-5">
                {/* First Row: Email and Contact */}
                <div className="d-flex">
                    <div className="">
                        <Link className="" href="mailto:help@staranddaisy.in">
                            <img
                                src="https://test.snd.in/wp-content/uploads/2024/07/email-id-staranddaisy.jpg"
                                className="inline-block h-auto max-w-full"
                                loading="lazy"
                                alt="Email Support"
                                style={{ margin: "auto", display: "block" }}
                            />
                        </Link>
                    </div>
                    <div className="">
                        <Link className="" href="tel:+919872399399">
                            <img
                                src="https://test.snd.in/wp-content/uploads/2024/07/contact-number-staranddaisy.jpg"
                                className="inline-block h-auto max-w-full"
                                loading="lazy"
                                alt="Contact Support"
                                style={{ margin: "auto", display: "block" }}
                            />
                        </Link>
                    </div>
                </div>

                {/* Second Row: Chat and Track Order */}
                <div className="d-flex">
                    <div className="">
                        <button
                            onClick={() => handleChatMessage("Hi, I need help with an existing order.")}
                        >
                            <img
                                src="https://test.snd.in/wp-content/uploads/2024/07/chat-support-staranddaisy.jpg"
                                className="inline-block h-auto max-w-full"
                                loading="lazy"
                                alt="Chat Support"
                                style={{ margin: "auto", display: "block" }}
                            />
                        </button>
                    </div>
                    <div className="">
                        <Link className="" href="/track-order">
                            <img
                                src="https://test.snd.in/wp-content/uploads/2024/07/track-your-order-staranddaisy.jpg"
                                className="inline-block h-auto max-w-full"
                                loading="lazy"
                                alt="Track Your Order"
                                style={{ margin: "auto", display: "block" }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
