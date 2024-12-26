import React from 'react'

const DTDCOrderDetails = ({ events }: { events: any }) => {

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr || dateStr.length !== 8) return "Invalid Date";

        // Extract day, month, and year from DDMMYYYY format
        const day = parseInt(dateStr.substring(0, 2), 10);
        const month = parseInt(dateStr.substring(2, 4), 10) - 1; // Months are 0-indexed in JS
        const year = parseInt(dateStr.substring(4), 10);

        // Create a Date object and format it
        const date = new Date(year, month, day);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto my-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Shipment Number:</p>
                    <p className="text-lg">{events?.orderDetail?.strShipmentNo || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Order Reference Number:</p>
                    <p className="text-lg">{events?.orderDetail?.strRefNo || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">CN Type Name:</p>
                    <p className="text-lg">{events?.orderDetail?.strCNTypeName || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Mode:</p>
                    <p className="text-lg">{events?.orderDetail?.strMode || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Origin:</p>
                    <p className="text-lg">{events?.orderDetail?.strOrigin || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Destination:</p>
                    <p className="text-lg">{events?.orderDetail?.strDestination || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Booked On:</p>
                    <p className="text-lg">{formatDate(events?.orderDetail?.strBookedDate) || 'N/A'} {events?.orderDetail?.strBookedTime || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Status Trans On:</p>
                    <p className="text-lg">{formatDate(events?.orderDetail?.strStatusTransOn) || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Current Status:</p>
                    <p className="text-lg">{events?.orderDetail?.strStatus || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">No Of Attempts:</p>
                    <p className="text-lg">{events?.orderDetail?.strNoOfAttempts || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">RTO Number:</p>
                    <p className="text-lg">{events?.orderDetail?.strRtoNumber || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Expected Delivery Date:</p>
                    <p className="text-lg">{formatDate(events?.orderDetail?.strExpectedDeliveryDate) || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Revised Expected Delivery Date:</p>
                    <p className="text-lg">{formatDate(events?.orderDetail?.strRevExpectedDeliveryDate) || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default DTDCOrderDetails