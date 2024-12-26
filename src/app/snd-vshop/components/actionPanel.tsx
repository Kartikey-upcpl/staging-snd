"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { addToCartAction } from "@/components/cart/actions";
import { useRouter } from "next/navigation";

interface ActionsPanelProps {
    id: number;
    Productslug: string;
    Likes: string
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({ Productslug, Likes, id }) => {
    const [liked, setLiked] = useState(false); // State to toggle heart icon
    const [fullUrl, setFullUrl] = useState("");
    const pathname = usePathname();
    const router = useRouter(); // Initialize Next.js router
    const [isClicked, setIsClicked] = useState(false); // State to track click
    const [isViewButtonClicked, setIsViewButtonClicked] = useState(false); // State to track click



    const formatLikes = (likes?: string) => {
        // If likes is undefined, generate a random number between 10,000 and 100,000
        if (likes === undefined) {
            const randomLikes = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
            return (randomLikes / 1000).toFixed(1).replace(/\.0$/, "") + "k";
        }
        // Convert likes to number
        const numericLikes = parseInt(likes, 10) || 0;

        // Format likes if it's 1000 or more
        if (numericLikes >= 1000) {
            return (numericLikes / 1000).toFixed(1).replace(/\.0$/, "") + "k";
        }

        // Return likes as is if less than 1000
        return numericLikes.toString();
    };


    // Function to toggle like state
    const toggleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = `${window.location.protocol}//${window.location.host}${pathname}`;
            setFullUrl(currentUrl);
        }
    }, [pathname]);

    const shareContent = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "title",
                    url: fullUrl,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback for browsers that do not support the Web Share API
            alert("Web Share API not supported in this browser.");
        }
    };

    const handleBuyNow = async () => {
        setIsClicked(!isClicked); // Toggle click state
        try {
            const payload = { id: id, quantity: 1 }; // Create the payload with ProductId
            const response = await addToCartAction({}, payload); // Call the action function
            // console.log("respso", response?.cart)
            if (response?.cart) {
                router.push("/cart");
                router.refresh();
                // console.log("respso", response?.cart)
            } else {
                console.error("Failed to add item to cart:", response);
                alert("Failed to add the item to the cart. Please try again.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the item to the cart. Please try again.");
        }
    };


    return (
        <div className="absolute top-[45%] right-1 flex flex-col items-center gap-2 bg-transparent z-10">
            {/* Like Button */}
            <div className="text-center">
                <div
                    className="relative flex items-center justify-center w-10 h-10 cursor-pointer"
                    onClick={toggleLike}
                >
                    {/* Background Circle */}
                    <div
                        className={`absolute inset-0 rounded-full ${liked ? "bg-white" : "bg-black opacity-50"
                            }`}
                    ></div>
                    {/* SVG Icon */}
                    <svg
                        className={`relative w-6 h-6 ${liked ? "text-black" : "text-white"
                            }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z"
                                fill={liked ? "#000000" : "#ffffff"} // Dynamic fill color
                            />
                        </g>
                    </svg>
                </div>
                <p className="text-sm  text-white">{formatLikes(Likes)}</p>
            </div>
            {/* Share Button */}
            <div onClick={shareContent} className="text-center">
                <div className="relative flex items-center justify-center w-10 h-10">
                    <div className="absolute inset-0 rounded-full bg-black opacity-50"></div>
                    <svg
                        className="relative w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
                                fill="white"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </div>
                <p className="text-sm  text-white mt-1">Share</p>
            </div>
            {/* View Button */}
            <div className="text-center">
                <div className="relative flex items-center justify-center w-10 h-10 cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-black opacity-50"></div>
                    <Link href={`/product/${Productslug}`} prefetch={true}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="relative w-6 h-6 text-white"
                        >
                            <ellipse cx="12" cy="12" rx="10" ry="5" fill="none" stroke="currentColor" />
                            <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" />
                        </svg>
                    </Link>
                </div>
                <p className="text-sm  text-white mt-1">View</p>
            </div>
            {/* Buy Now Button */}
            <div className="text-center">
                <div onClick={handleBuyNow} // Attach the click handler here
                    className="relative flex items-center justify-center w-10 h-10 cursor-pointer mx-auto">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full bg-black opacity-50"></div>

                    {/* SVG Icon */}
                    <svg
                        className={`relative w-6 h-6 ${isClicked ? "text-red-500 scale-125 animate-ping-once" : "text-white"} transition-transform duration-200 ease-in-out`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2.08416 2.7512C2.22155 2.36044 2.6497 2.15503 3.04047 2.29242L3.34187 2.39838C3.95839 2.61511 4.48203 2.79919 4.89411 3.00139C5.33474 3.21759 5.71259 3.48393 5.99677 3.89979C6.27875 4.31243 6.39517 4.76515 6.4489 5.26153C6.47295 5.48373 6.48564 5.72967 6.49233 6H17.1305C18.8155 6 20.3323 6 20.7762 6.57708C21.2202 7.15417 21.0466 8.02369 20.6995 9.76275L20.1997 12.1875C19.8846 13.7164 19.727 14.4808 19.1753 14.9304C18.6236 15.38 17.8431 15.38 16.2821 15.38H10.9792C8.19028 15.38 6.79583 15.38 5.92943 14.4662C5.06302 13.5523 4.99979 12.5816 4.99979 9.64L4.99979 7.03832C4.99979 6.29837 4.99877 5.80316 4.95761 5.42295C4.91828 5.0596 4.84858 4.87818 4.75832 4.74609C4.67026 4.61723 4.53659 4.4968 4.23336 4.34802C3.91052 4.18961 3.47177 4.03406 2.80416 3.79934L2.54295 3.7075C2.15218 3.57012 1.94678 3.14197 2.08416 2.7512Z"
                            />
                            <path
                                d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                            />
                            <path
                                d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                            />
                        </g>
                    </svg>
                </div>
                <p className="text-sm  text-white mt-1">Buy Now</p>
            </div>
        </div >
    );
};

export default ActionsPanel;    