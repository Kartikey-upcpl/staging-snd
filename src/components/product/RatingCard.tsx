"use client"
import React, { useState, useEffect } from "react";
import { FloatStarRating } from "../ui/InputRating";

interface RatingDataType {
    average_rating: string
    rating_count: number
}

const RatingCard: React.FC<RatingDataType> = ({ average_rating, rating_count }) => {



    return (
        <div className="flex gap-4 p-4">
            {/* Card 1: Average Rating */}
            <div className=" w-1/2 flex border p-6 rounded-lg shadow-md justify-center items-center text-center gap-4">
                <div className="" >
                    <div className=" text-3xl font-bold text-gray-800">
                        {average_rating}/5
                    </div>
                    <div className=" reviews-group d-flex">
                        <FloatStarRating value={parseFloat(average_rating)} />
                    </div>
                </div>
                <div className="text-gray-600">
                    Based on {rating_count} rating(s)
                </div>

            </div>

            {/* Card 2: Quality, Price, Service */}
            <div className="w-1/2 border p-6 rounded-lg shadow-md flex-1">
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span>Quality</span>
                        <span>100%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-yellow-500 h-4 rounded-full"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span>Price</span>
                        <span>100%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-yellow-500 h-4 rounded-full"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span>Service</span>
                        <span>100%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-yellow-500 h-4 rounded-full"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
