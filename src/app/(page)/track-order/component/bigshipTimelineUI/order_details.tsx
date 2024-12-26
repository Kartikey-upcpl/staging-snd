import React from 'react'

const BigshipOrderDetails = ({ events }: { events: any }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto my-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Order ID:</p>
                    <p className="text-lg">{events?.orderDetail?.orderId}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Order Placed On:</p>
                    <p className="text-lg">{events?.orderDetail?.orderPlacedOn}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Order Status:</p>
                    <p className="text-lg">{events?.orderDetail?.orderStatus}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Courier Name:</p>
                    <p className="text-lg">{events?.orderDetail?.courierName}</p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-green-700">Tracking Id:</p>
                    <p className="text-lg">{events?.orderDetail?.trackingId}</p>
                </div>
            </div>
        </div>
    );
}

export default BigshipOrderDetails