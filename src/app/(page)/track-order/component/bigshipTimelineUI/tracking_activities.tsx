import React from 'react';


const BigshipTrackingACtivities = ({ events }: { events: any }) => {
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
                            {event.trackDate}, {event.trackTime.slice(0, 5)}
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                            <strong>Status:</strong> {event.trackActivityStatus}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Remarks:</strong> {event.trackActivityRemarks || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Current Location:</strong> {event.trackLocation || "N/A"}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default BigshipTrackingACtivities;
