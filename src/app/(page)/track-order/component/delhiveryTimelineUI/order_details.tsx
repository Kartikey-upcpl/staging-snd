import React from 'react'

const DelhiveryOrderDetails = ({ events }: { events: any }) => {

    const formatDate = (isoDateStr: string | undefined): string => {
        if (!isoDateStr) return "N/A"; // Handle missing date

        const date = new Date(isoDateStr);

        // Ensure the date is valid
        if (isNaN(date.getTime())) return "Invalid Date";

        // Format the date as DD/MM/YYYY HH:mm
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto my-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">PickUpDate:</p>
                    <p className="text-lg">{formatDate(events?.PickUpDate) || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Destination:</p>
                    <p className="text-lg">{events?.Destination || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Dest Recieve Date:</p>
                    <p className="text-lg">{formatDate(events?.DestRecieveDate) || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Invoice Amount:</p>
                    <p className="text-lg">{events?.InvoiceAmount || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Delivery Date:</p>
                    <p className="text-lg">{formatDate(events?.DeliveryDate) || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Sender Name:</p>
                    <p className="text-lg">{events?.SenderName || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">AWB:</p>
                    <p className="text-lg">{events?.AWB || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Order Type:</p>
                    <p className="text-lg">{events?.OrderType || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Expected Delivery Date:</p>
                    <p className="text-lg">{formatDate(events?.ExpectedDeliveryDate) || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">First Attempt Date:</p>
                    <p className="text-lg">{formatDate(events?.FirstAttemptDate) || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Origin:</p>
                    <p className="text-lg">{events?.Origin || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default DelhiveryOrderDetails