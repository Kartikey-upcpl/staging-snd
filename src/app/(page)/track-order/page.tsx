"use client";
import React, { useState, useEffect, useTransition, useRef } from "react";
import { useFormState } from "react-dom";
import Loading from "@/components/ui/Loading";
import { trackOrder } from "@/components/product/actions";
import StepsToTrackShipment from "./component/steps_track_shipment";
import ShipRocketTimelineUI from "./component/shiprocketTimelineUI/shiprocket_timeline_ui";
import DTDCTimelineUI from "./component/dtdcTimelineUI/dtdc_timeline_ui";
import DelhiveyTimelineUI from "./component/delhiveryTimelineUI/delhivery_timeline_ui";
import BigshipTimelineUI from "./component/bigshipTimelineUI/bigship_timeline_ui";
import { useSearchParams } from "next/navigation";
interface MetaData {
    id: number;
    key: string;
    value: string;
}

interface TrackingInfo {
    trackingMessage: string;
    trackingUrl: string;
    trackingCode: string;
    carrier: string;
}

const predefinedCarriers = {
    DELHIVERY: "/api/delhivery",
    BIGSHIP: "/api/bigship",
    SR_XPRESSBEED: "/api/shiprocket",
    SR_DELIVERY: "/api/shiprocket",
    SR_ECOM: "/api/shiprocket",
    SR_AMAZONSHIPPING: "/api/shiprocket",
    SR_EKART: "/api/shiprocket",
    SR_SHADOWFAX: "/api/shiprocket",
    DTDC: "/api/dtdc",
} as const;

type CarrierKey = keyof typeof predefinedCarriers;

const OrderTrackingForm: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [liveTrackingData, setLiveTrackingData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const liveTrackingRef = useRef<HTMLDivElement>(null);


    const searchParams = useSearchParams();
    const emailfromOrderPage = searchParams.get("email");
    const orderIDfromOrderPage = searchParams.get("orderID");

    useEffect(() => {
        if (emailfromOrderPage && orderIDfromOrderPage) {
            const formData = new FormData();
            formData.append("email", emailfromOrderPage);
            formData.append("orderID", orderIDfromOrderPage);

            // Automatically submit the form to fetch tracking details
            action(formData);
        }
    }, [emailfromOrderPage, orderIDfromOrderPage]);


    const [state, action] = useFormState(
        async (currentState: any, formData: any) => {
            const orderId = formData.get("orderID") as string;
            const email = formData.get("email") as string;
            setTrackingInfo(null);
            setErrorMessage(null);
            setLiveTrackingData(null)

            if (orderId) {
                const response = await trackOrder(orderId);

                if (!response?.data) {
                    setErrorMessage("Invalid order ID.");
                    return { ...currentState, message: "Invalid order ID." };
                }

                const { billing, meta_data: metaData = [] } = response.data;

                if (billing?.email !== email) {
                    setErrorMessage("The entered email does not match our records.");
                    return { ...currentState, message: "Email mismatch." };
                }

                const carrier =
                    metaData.find((item: MetaData) => item.key === "ywot_carrier_id")
                        ?.value || "Unknown";
                const trackingCode =
                    metaData.find((item: MetaData) => item.key === "ywot_tracking_code")
                        ?.value || "N/A";
                const trackingUrl =
                    metaData.find((item: MetaData) => item.key === "ywot_tracking_url")
                        ?.value || "#";
                const trackingMessage =
                    carrier === "Unknown" || trackingCode === "N/A"
                        ? "Tracking info not available"
                        : `Your order has been shipped by ${carrier}. Your track code is ${trackingCode}.`;

                setTrackingInfo({
                    trackingMessage,
                    trackingUrl,
                    trackingCode,
                    carrier,
                });

                // Auto-trigger live tracking if carrier is predefined
                if (carrier.toUpperCase() in predefinedCarriers) {
                    handleLiveTracking(carrier, trackingCode);
                }

                // Scroll to live tracking info
                if (liveTrackingRef.current) {
                    liveTrackingRef.current.scrollIntoView({ behavior: "smooth" });
                }

                return { ...currentState, data: response.data || [], message: null };
            }
            return { ...currentState, message: "Invalid order ID." };
        },
        { data: null, message: null }
    );

    const handleLiveTracking = async (
        carrier: string,
        trackingNumber: string
    ): Promise<void> => {
        const apiRoute = predefinedCarriers[carrier.toUpperCase() as CarrierKey];

        if (!apiRoute) {
            setErrorMessage("Carrier not supported for live tracking.");
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage(null);
            const response = await fetch(`${apiRoute}?awb_code=${trackingNumber}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to fetch live tracking.");
            }

            setLiveTrackingData(data); // Store tracking data if successful
        } catch (error: any) {
            console.error("Error fetching live tracking:", error);
            setErrorMessage(error.message || "Failed to fetch live tracking data.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderLiveTrackingInfo = () => {
        if (isLoading) return <Loading />;

        if (errorMessage) {
            return <p className="text-red-600">{errorMessage}</p>;
        }

        if (liveTrackingData) {
            const carrier = trackingInfo?.carrier.toUpperCase();

            // Render the correct timeline based on the carrier
            if (carrier && carrier.startsWith("SR_")) {
                return (
                    <ShipRocketTimelineUI
                        events={liveTrackingData?.tracking_data}
                    />
                );
            } else if (carrier === "DTDC") {
                return (
                    <DTDCTimelineUI
                        events={liveTrackingData?.data}
                    />
                );
            } else if (carrier === "DELHIVERY") {
                return (
                    <DelhiveyTimelineUI
                        events={liveTrackingData?.ShipmentData[0].Shipment}
                    />
                );
            }
            else if (carrier === "BIGSHIP") {
                return (
                    <BigshipTimelineUI
                        events={liveTrackingData?.data?.data}
                    />
                );
            }
            else {
                return <p className="text-gray-600">Carrier not supported for live tracking.</p>;
            }
        }

        return null;
    };

    const handleCopyTrackingCode = async () => {
        if (trackingInfo?.trackingCode) {
            try {
                await navigator.clipboard.writeText(trackingInfo.trackingCode);
                alert("Tracking code copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy tracking code: ", err);
                alert("Failed to copy the tracking code. Please try again.");
            }
        } else {
            alert("No tracking code available to copy.");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(() => {
            action(formData); // Trigger the form action
        });
    };



    return (
        <div className="">
            <div className="sm:w-1/3 w-4/5 mx-auto p-8 bg-white rounded-lg shadow-md m-10">
                <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
                    Track Your Order
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1" htmlFor="email">
                            Enter your email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-50 focus:ring-blue-600"
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm font-semibold mb-1"
                            htmlFor="orderID"
                        >
                            Enter your order ID:
                        </label>
                        <input
                            type="text"
                            id="orderID"
                            name="orderID"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-50 focus:ring-blue-600"
                            placeholder="Your order ID"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-pink-600 text-white font-semibold px-20 py-2 rounded-md hover:bg-pink-700 cursor-pointer"
                        >
                            {isPending ? <Loading /> : "Track Order"}
                        </button>
                    </div>
                </form>
            </div>

            <div ref={liveTrackingRef} className="flex justify-center">
                {trackingInfo && !(trackingInfo.carrier.toUpperCase() in predefinedCarriers) && (
                    <div className="mb-6 p-6 sm:w-1/2 w-4/5 text-center  bg-white rounded-2xl shadow-xl">
                        <p>
                            <span className="font-bold">Tracking info:</span>
                            {trackingInfo.trackingMessage}
                        </p>


                        {
                            trackingInfo.trackingCode !== "N/A" &&
                            <div className="mt-3">
                                <button
                                    onClick={handleCopyTrackingCode}
                                    className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-700 cursor-pointer"
                                >
                                    Copy Tracking Code
                                </button>
                            </div>
                        }
                        {
                            trackingInfo.trackingUrl !== "#" &&
                            <div className="mt-3">
                                <a
                                    href={trackingInfo.trackingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-700 cursor-pointer"
                                >
                                    Track on Carrier Website
                                </a>
                            </div>
                        }
                    </div>
                )}
            </div>

            <div ref={liveTrackingRef} className="flex justify-center">
                {renderLiveTrackingInfo()}
            </div>
            <StepsToTrackShipment />
            <div className='bg-white flex justify-center smpb-20'>
                <img
                    src="assets/images/track_order_image.jpg"
                    className="w-4/5 "
                />
            </div>
        </div>
    );
};

export default OrderTrackingForm;







