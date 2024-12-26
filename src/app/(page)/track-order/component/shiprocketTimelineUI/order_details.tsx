import React from 'react'

const ShiprocketOrderDetails = ({ events }: { events: any }) => {

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

    return (<>
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Order Details</h2>

        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">AWB Code:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.awb_code || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Pickup Date:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.pickup_date || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Delivered Date:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.delivered_date || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Weight:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.weight || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Current Status:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.current_status || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Delivered To:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.delivered_to || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Destination:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.destination || 'N/A'} </p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Consignee Name:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.consignee_name || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Origin:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.origin || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Courier Name::</p>
                    <p className="text-lg">{events?.shipment_track[0]?.courier_name || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">EDD</p>
                    <p className="text-lg">{events?.shipment_track[0]?.edd || 'N/A'}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">RTO Delivered Date:</p>
                    <p className="text-lg">{events?.shipment_track[0]?.rto_delivered_date || 'N/A'}</p>
                </div>

            </div>
        </div>
    </>
    );
}

export default ShiprocketOrderDetails