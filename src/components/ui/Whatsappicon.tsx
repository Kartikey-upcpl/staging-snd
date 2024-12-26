"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { initializeIntercom, waitForIntercom } from "../bottombar/component/loadIntercomSdk";
import Loading from "../../components/ui/Loading"; // Import your Loading component

const WhatsAppIcon = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false); // State to manage loading
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleChatMessage = async (message: string) => {
        setLoading(true); // Start loading
        initializeIntercom(); // Initialize Intercom
        await waitForIntercom(); // Wait until Intercom is ready
        setLoading(false); // Stop loading
        window.Intercom?.("showNewMessage", message);
    };

    const openModal = async () => {
        setModalOpen(true); // Open the modal
    };

    return (
        <div>
            <div className="fixed left-0 w-10 h-20 top-1/2 z-1 bg-white space-y-2 p-1 rounded-r-lg">
                <Link
                    href="https://play.google.com/store/apps/details?id=com.staranddaisy.android"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                >
                    <img
                        className="w-8 h-8"
                        src="https://staranddaisy.in/wp-content/uploads/2021/09/goole-play-store-icon.png"
                        alt="Star and Daisy Android App"
                    />
                </Link>
                <Link
                    href="https://apps.apple.com/app/id1593412273"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2"
                >
                    <img
                        className="w-8 h-8 mt-2"
                        src="https://staranddaisy.in/wp-content/uploads/2021/09/apple-store-icon.png"
                        alt="Star and Daisy iOS App"
                    />
                </Link>
            </div>

            <div>
                {/* Support Button */}
                <button
                    onClick={openModal} // Open modal with loading
                    className="fixed bottom-5 w-14 h-14 bg-green-500 rounded-full items-center justify-center shadow-lg z-1 cursor-pointer whatsapp-icon hidden md:flex"
                    style={{ right: `calc(5% + 20px)` }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="white"
                        width="32px"
                        height="32px"
                    >
                        <path d="M16.002 0C7.164 0 0 7.164 0 16.002c0 2.819.734 5.586 2.134 8.021l-2.133 7.81L7.838 29.87A15.927 15.927 0 0 0 16.002 32c8.838 0 16-7.162 16-15.998C31.996 7.164 24.836 0 16.002 0zm8.776 24.184c-.395.78-1.49 1.452-2.454 1.647-1.623.352-4.58.678-8.3-1.764-3.294-2.058-5.428-6.074-5.594-6.345-.165-.273-1.336-2.212-1.336-4.216s.838-3.008 1.179-3.423c.353-.435.774-.532 1.164-.532.283 0 .532.002.76.013.247.012.579-.095.906.695.335.808 1.143 2.788 1.24 2.992.1.203.165.442.03.715-.136.273-.204.442-.394.673-.2.236-.42.526-.6.705-.195.194-.4.405-.17.795.23.39 1.02 1.682 2.19 2.719 1.506 1.268 2.774 1.662 3.176 1.851.402.19.637.16.875-.096.237-.253.974-1.145 1.232-1.537.257-.39.523-.33.873-.193.35.138 2.216 1.05 2.6 1.24.384.19.64.284.735.444.094.158.094.91-.303 1.69z" />
                    </svg>
                </button>
                <div
                    onClick={scrollToTop}
                    className={`fixed sm:bottom-6 bottom-20 right-6 bg-white text-black flex items-center justify-center border-2 border-black z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                        } `}
                    aria-label="Scroll to Top"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 8l-4.95 4.95a1 1 0 001.414 1.414L12 10.828l3.536 3.536a1 1 0 001.414-1.414L12 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Loading Spinner */}
                {isLoading ? <Loading className="spinner-border-sm text-white" /> : "Check"} {/* Show loading text */}


                {/* Modal */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex justify-end"
                        onClick={() => setModalOpen(false)} // Close modal on backdrop click
                    >
                        {/* Modal Content */}
                        <div
                            className="fixed bottom-[80px] right-[calc(5%+20px)] w-60 bg-white rounded-lg shadow-lg p-2 text-sm font-semibold"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            <button
                                onClick={() => handleChatMessage("Hi, I need help with an existing order.")}
                                className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded"
                            >
                                {isLoading ? <Loading className="spinner-border-sm text-white" /> : "Chat for Existing Orders"}
                            </button>
                            <Link
                                className="flex items-center w-full px-2 py-2 hover:bg-gray-100 rounded"
                                href="https://api.whatsapp.com/send?phone=+919990233227&amp;text=Hi%0AI%20am%20interested%20in%20the%20following%20product%0ACan%20you%20please%20help.%0Ahttps%3A%2F%2Fstaranddaisy.link%2F"
                            >
                                Chat for New Orders
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsAppIcon;
