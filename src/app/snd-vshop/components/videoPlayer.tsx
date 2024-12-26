"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import ActionsPanel from "./actionPanel";
import Loading from "@/components/ui/Loading";

interface VideoPlayerProps {
    id: number;
    name: string;
    slug: string;
    videoUrl: string;
    isActive: boolean;
    description: string;
    likes: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    id,
    name,
    slug,
    videoUrl,
    isActive,
    description,
    likes,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const video = videoRef.current;

        if (video && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsLoading(false); // Video is ready
            });
        } else if (video) {
            video.src = videoUrl;
            video.oncanplaythrough = () => setIsLoading(false);
        }
    }, [videoUrl]);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            if (isActive) {
                video.play().catch(() => setIsLoading(false)); // Play video
            } else {
                video.pause();
                video.currentTime = 0; // Reset inactive videos
            }
        }
    }, [isActive]);

    return (
        <div className="relative w-full h-screen">
            {isLoading && (
                // Show loading indicator
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black">
                    <Loading />
                </div>
            )}

            <video
                ref={videoRef}
                className={`absolute top-0 left-0 w-full h-full object-fill ${isLoading ? "hidden" : "flex"}`}
                loop
                playsInline
                preload="auto"
            />
            {name && name != "Unknown" && description && (
                <div className="absolute bottom-14 px-2 mx-auto text-white z-10 bg-gradient-to-t from-[rgba(32,30,30,0.7)] from-[100%] via-[rgba(0,0,0,0.4)] via-[80%] to-transparent">
                    <p className="font-semibold text-base line-clamp-1">{name}</p>
                    <p>─────</p>
                    <p className="text-sm pb-2 line-clamp-2">{description}...</p>

                </div>
            )}
            <ActionsPanel Productslug={slug} Likes={likes} id={id} />
        </div>
    );
};

export default VideoPlayer;