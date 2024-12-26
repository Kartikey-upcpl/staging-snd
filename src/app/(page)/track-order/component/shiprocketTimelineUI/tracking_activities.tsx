import React from 'react';

const ShiprocketTrackingACtivities = ({ events }: { events: any }) => {
    return (
        <div className="relative flex flex-col space-y-8">

            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Tracking Activities</h2>

            {/* Vertical connecting line */}
            <div className="absolute left-[0.4em] top-0 h-full w-1 bg-gray-300 rounded-md"></div>

            {events?.shipment_track_activities?.map((event: any, index: number) => (
                <div key={index} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-yellow-500"></div>

                    {/* Timeline content card */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-full">
                        <p className="text-sm text-gray-500">
                            <strong>Date & Time:</strong>{" "}
                            {new Date(event.date).toLocaleString()}
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                            <strong>Status:</strong> {event["sr-status-label"]}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Activity:</strong> {event.activity}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Location:</strong> {event.location || "N/A"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShiprocketTrackingACtivities;
