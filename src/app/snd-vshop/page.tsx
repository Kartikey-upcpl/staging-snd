"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Reels from "./components/reel";
import { getTaggedProductById } from "@/components/checkout/actions";

interface Reel {
    id: number;
    slug: string;
    videoUrl: string;
    name: string;
    description: string;
    likes: string;
}

const Vshop = () => {
    // State Variables
    const [videoList, setVideoList] = useState<Reel[]>([]); // Store reels
    // console.log("videoList", videoList)
    const [page, setPage] = useState(1); // Current fetch page
    const [loading, setLoading] = useState(true); // Loading state
    const [hasMore, setHasMore] = useState(true); // Whether more reels are available
    const [isFetching, setIsFetching] = useState(false); // Prevent multiple fetches
    const [loadingComplete, setLoadingComplete] = useState(false); // Initial fetch lock

    // Index Tracking
    const [currentIndex, setCurrentIndex] = useState<number>(0); // React State for rendering
    const currentIndexRef = useRef<number>(0); // Ref for internal tracking
    const isMounted = useRef(false); // Prevent duplicate fetch in Strict Mode

    // --- FETCH REELS ---
    const fetchReels = useCallback(async (pageNumber: number) => {
        if (isFetching) return; // Prevent duplicate fetch
        setIsFetching(true); // Lock fetch

        try {
            // console.log("Fetching page:", pageNumber); // DEBUG

            const response = await getTaggedProductById(pageNumber);

            if (!response || response.status) {
                console.error("Error fetching reels:", response?.message || "Unknown error");
                setHasMore(false); // No more reels
                return;
            }

            // Transform API response into Reel objects
            const newReels: Reel[] = response.map((reel: any) => ({
                id: reel.id,
                slug: reel.slug,
                videoUrl: reel.meta_data.find(
                    (item: any) => item.key === "_app_builder_shopping_video_addons_video_url"
                )?.value || "",
                name: reel.meta_data.find(
                    (item: any) => item.key === "_app_builder_shopping_video_addons_video_name"
                )?.value || "Unknown",
                description: reel.meta_data.find(
                    (item: any) => item.key === "_app_builder_shopping_video_addons_video_description"
                )?.value || "",
                likes: reel.meta_data.find(
                    (item: any) => item.key === "app_builder_shopping_video_addons_likes"
                )?.value || "0",
            }));

            // Append new reels without trimming
            setVideoList((prevList) => {
                const updatedList = [...prevList, ...newReels];
                // console.log("Updated list length:", updatedList.length);
                return updatedList;
            });

            setHasMore(newReels.length > 0); // Update availability
        } catch (error) {
            console.error("Error fetching reels:", error);
            setHasMore(false);
        } finally {
            setLoading(false); // Hide loader
            setLoadingComplete(true); // Mark initial fetch complete
            setIsFetching(false); // Unlock fetch
        }
    }, [isFetching]);

    // --- INITIAL FETCH ---
    useEffect(() => {
        if (isMounted.current) return; // Prevent duplicate fetch in Strict Mode
        isMounted.current = true; // Mark component as mounted

        // console.log("Initial fetch triggered"); // DEBUG
        fetchReels(1); // Fetch first page on load
    }, []);

    // --- PRELOAD MORE REELS ---
    useEffect(() => {
        if (loadingComplete && !isFetching && currentIndexRef.current >= videoList.length - 5 && hasMore) {
            fetchMore();
        }
    }, [videoList, hasMore, isFetching, loadingComplete]);

    // --- FETCH MORE FUNCTION ---
    const fetchMore = () => {
        if (!isFetching && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchReels(nextPage);
        }
    };

    // --- HANDLE INDEX CHANGE ---
    const handleIndexChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
        let newIndex =
            typeof value === "function" ? value(currentIndexRef.current) : value;

        // console.log("handleIndexChange called:");
        // console.log("  - newIndex requested:", newIndex);
        // console.log("  - currentIndexRef.current:", currentIndexRef.current);
        // console.log("  - videoList.length:", videoList.length);

        // Preserve currentIndex when list updates
        if (newIndex === 0 && currentIndexRef.current > 0) {
            newIndex = currentIndexRef.current; // Retain previous index
        }

        // Ensure the index stays within bounds dynamically
        const adjustedIndex = Math.max(0, Math.min(newIndex, videoList.length - 1));
        currentIndexRef.current = adjustedIndex;
        setCurrentIndex(adjustedIndex); // Sync state for rendering
    };

    // --- RENDER ---
    return (
        <div className="h-screen p-0">
            {loading && videoList.length === 0 ? (
                <div className="flex items-center justify-center h-screen bg-black text-white">
                    Loading...
                </div>
            ) : (
                <Reels
                    videoData={videoList}
                    isLoading={loading}
                    currentIndex={currentIndex}
                    setCurrentIndex={handleIndexChange}
                    fetchMore={fetchMore}
                />
            )}
        </div>
    );
};

export default Vshop;