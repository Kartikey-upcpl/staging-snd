"use client"
import React, { useEffect, useState } from "react";

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Function to calculate the time left until midnight
    const calculateTimeLeft = () => {
        const now = new Date().getTime(); // Get current time in milliseconds
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0); // Set to midnight of the next day
        const difference = tomorrow.getTime() - now; // Subtract timestamps


        if (difference > 0) {
            setTimeLeft({
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        } else {
            // Reset timer at midnight
            setTimeLeft({
                hours: 24,
                minutes: 0,
                seconds: 0,
            });
        }
    };

    useEffect(() => {
        calculateTimeLeft(); // Initialize the timer
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="flash-sale ">
            {/* Borders */}
            <div className="anime-border top-border"></div>
            <div className="anime-border right-border"></div>
            <div className="anime-border bottom-border"></div>
            <div className="anime-border left-border"></div>

            {/* Flash Sale Content */}
            <div className="flash-text flex p-2 ">
                <div className="">
                    <svg
                        className=""
                        fill="currentColor"
                        height="12"
                        viewBox="0 0 16 16"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"></path>
                    </svg>
                </div>
                <div className="flex">
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div className="timer-block" >
                            Ending In <span>:</span>
                        </div>
                        <div className="timer-block">
                            {timeLeft.hours} <span>hours</span>
                        </div>
                        <div className="timer-block">
                            {timeLeft.minutes} <span>min</span>
                        </div>
                        <div className="timer-block">
                            {timeLeft.seconds} <span>sec</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSale;
