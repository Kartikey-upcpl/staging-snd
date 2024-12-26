import React from 'react';


const DTDCTrackingACtivities = ({ events }: { events: any }) => {
    const formatDateTime = (dateStr: string, timeStr: string): string => {
        // Extract day, month, and year from the date string (DDMMYYYY)
        const day = dateStr.substring(0, 2); // "30"
        const month = dateStr.substring(2, 4); // "08"
        const year = dateStr.substring(4); // "2024"
        // Extract hours and minutes from the time string (HHmm)
        const hours = timeStr.substring(0, 2); // "10"
        const minutes = timeStr.substring(2); // "58"

        // Return a single formatted string: "30/08/2024 10:58"
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    return (
        <div className="relative flex flex-col space-y-8">
            {/* Vertical connecting line */}
            <div className="absolute left-[0.4em] top-0 h-full w-1 bg-gray-300 rounded-md"></div>

            {events?.awbTrackingDetails?.map((event: any, index: number) => (
                <div key={index} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-yellow-500"></div>

                    {/* Timeline content card */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-full mx-4">
                        <p className="text-sm text-gray-500">
                            <strong>Date & Time:</strong>{" "}
                            {formatDateTime(event.strActionDate, event.strActionTime)}
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                            <strong>Status:</strong> {event.strAction}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Remarks:</strong> {event.sTrRemarks || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Current Location:</strong> {event.strOrigin || "N/A"}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default DTDCTrackingACtivities;
