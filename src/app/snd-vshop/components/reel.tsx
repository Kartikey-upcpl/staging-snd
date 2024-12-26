"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import VideoPlayer from "./videoPlayer";
import Loading from "@/components/ui/Loading";

interface Reel {
    id: number;
    name: string;
    slug: string;
    videoUrl: string;
    description: string;
    likes: string;
}

interface ReelsProps {
    videoData: Reel[];
    isLoading: boolean;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    fetchMore: () => void; // Function to fetch more reels
}


const Reels: React.FC<ReelsProps> = ({
    videoData,
    isLoading,
    currentIndex,
    setCurrentIndex,
    fetchMore,
}) => {

    const offset = useRef(0); // Track trimmed reels offset

    const handlers = useSwipeable({
        onSwipedUp: () => {
            const nextIndex = currentIndex + 1;

            // Preload more reels when near the end
            if (nextIndex >= videoData.length - 5) {
                fetchMore();
            }
            setCurrentIndex(Math.min(nextIndex, videoData.length - 1));
        },
        onSwipedDown: () => {
            setCurrentIndex(Math.max(currentIndex - 1, 0));
        },
        preventScrollOnSwipe: true,
        trackTouch: true,
    });


    // --- Trim List to 30 Reels ---
    useEffect(() => {
        if (videoData.length > 30) {
            const excess = videoData.length - 30;
            offset.current += excess; // Adjust offset for trimmed data
        }
    }, [videoData]);


    if (isLoading && videoData.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <Loading />
            </div>
        );
    }


    return (
        <div
            {...handlers}
            className="relative h-screen overflow-hidden bg-black"
        >
            {videoData.map((video, index) => (
                <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        transform: `translateY(${(index - currentIndex) * 100}%)`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                    <VideoPlayer
                        id={video.id}
                        name={video?.name}
                        videoUrl={video.videoUrl}
                        description={video.description}
                        likes={video.likes}
                        slug={video.slug}
                        isActive={index === currentIndex}
                    />
                </div>
            ))}
        </div>
    );

};

export default Reels;