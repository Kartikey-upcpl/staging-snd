import React from "react";

const StepsToTrackShipment = () => {
    return (
        <div className="flex items-center justify-center p-6 sm:p-12">
            <div className="bg-green-100 p-6 sm:p-8 lg:p-12 rounded-lg shadow-lg sm:w-3/4	">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-blue-900 mb-6">
                    Steps to Track Your Order Shipment
                </h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-4 text-sm sm:text-base lg:text-lg">
                    <li>
                        Enter the email address you used during order placement into the
                        Enter your email input box.
                    </li>
                    <li>
                        Enter your order ID into the Enter your order ID input box.
                    </li>
                    <li>Click on the Track Order button.</li>
                    <li>Click on the COPY TRACKING CODE button.</li>
                    <li>
                        Click on the TRACK YOUR ORDER button. This action will redirect you
                        to our courier partner's website.
                    </li>
                    <li>
                        Paste the copied tracking code into the provided field and click on
                        the “Track/Search” button.
                    </li>
                </ol>
                <p className="mt-6 text-red-700 italic text-sm sm:text-base">
                    Note: If you encounter an alert stating “This order does not have any
                    tracking information,” it means the related order lacks tracking
                    details. You may try tracking again later. Alternatively, you can
                    reach out to our customer support for assistance.
                </p>
            </div>
        </div>
    );
}


export default StepsToTrackShipment