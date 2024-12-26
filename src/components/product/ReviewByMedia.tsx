"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface MediaDataType {
    comment_ID: string;
    images: string[];
    videos: string[];
    rating: number;
}

interface ReviewByMediaProps {
    mediaData?: MediaDataType[];
}

const ReviewByMedia: React.FC<ReviewByMediaProps> = ({ mediaData = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [modalType, setModalType] = useState<"image" | "video">("image");
    const [activeMediaItems, setActiveMediaItems] = useState<string[]>([]);
    const isMobile = window.innerWidth <= 768; // Example breakpoint for mobile


    const openModal = (index: number, type: "image" | "video", mediaItems: string[]) => {
        setCurrentMediaIndex(index);
        setModalType(type);
        setActiveMediaItems(mediaItems);
        setIsModalOpen(true);
    };


    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4">
            {/* Reviews with Videos Section */}
            <h2 className="text-lg font-semibold mb-4">Reviews with Videos</h2>
            {!isMobile ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {mediaData.flatMap((review) =>
                        review.videos.map((videoUrl, index) => {
                            const allVideos = mediaData.flatMap((item) => item.videos); // Aggregate all videos
                            return (
                                <div
                                    key={`${review.comment_ID}-video-${index}`}
                                    className="flex justify-center items-center overflow-hidden relative cursor-pointer max-w-36 h-full"
                                    onClick={() => openModal(allVideos.indexOf(videoUrl), "video", allVideos)}
                                >
                                    <video className="aspect-[9/16] rounded-lg object-cover">
                                        <source src={videoUrl} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg overflow-hidden">
                                        <span className="text-white text-3xl flex items-center justify-center h-full">
                                            ▶️
                                        </span>
                                    </div>
                                    <div className="absolute text-yellow-500 text-center bottom-5">
                                        {"⭐".repeat(review.rating)}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            ) : (
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Navigation]}
                    navigation
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={2.2}
                >
                    {mediaData.flatMap((review) =>
                        review.videos.map((videoUrl, index) => {
                            const allVideos = mediaData.flatMap((item) => item.videos);
                            return (
                                <SwiperSlide key={`${review.comment_ID}-video-${index}`}>
                                    <div
                                        className="flex justify-center items-center overflow-hidden relative cursor-pointer max-w-36 h-full"
                                        onClick={() => openModal(allVideos.indexOf(videoUrl), "video", allVideos)}
                                    >
                                        <video className="aspect-[9/16] rounded-lg object-cover">
                                            <source src={videoUrl} type="video/mp4" />
                                        </video>
                                        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg overflow-hidden">
                                            <span className="text-white text-3xl flex items-center justify-center h-full">
                                                ▶️
                                            </span>
                                        </div>
                                        <div className="absolute text-yellow-500 text-center bottom-5">
                                            {"⭐".repeat(review.rating)}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )}
                </Swiper>
            )}

            {/* Reviews with Images Section */}
            <h2 className="text-lg font-semibold mt-8 mb-4">Reviews with Images</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                loop={false}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {mediaData.flatMap((review) =>
                    review.images.map((imageUrl, index) => {
                        const allImages = mediaData.flatMap((item) => item.images); // Aggregate all videos
                        return (
                            <SwiperSlide key={`${review.comment_ID}-image-${index}`}>
                                <div
                                    className="relative cursor-pointer flex justify-center items-center"
                                    onClick={() => openModal(allImages.indexOf(imageUrl), "image", allImages)} // Pass all videos
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Image ${index}`}
                                        className="rounded-lg w-[14rem] max-h-[14rem]"
                                    />
                                    <div className="absolute bottom-2 center bg-black bg-opacity-50 px-2 py-1 rounded text-yellow-500">
                                        {"⭐".repeat(review.rating)}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>

            {/* Modal for Image/Video Viewer */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center z-50">
                    <button
                        className="absolute top-4 right-4 text-red text-4xl"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                    <Swiper
                        initialSlide={currentMediaIndex}
                        navigation
                        loop={activeMediaItems.length > 1} // Enable loop only for multiple slides
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        className="w-11/12 md:w-2/3 lg:w-1/2 h-auto"
                    >
                        {activeMediaItems.map((mediaUrl, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex justify-center items-center h-auto">
                                    {modalType === "image" ? (
                                        <img
                                            src={mediaUrl}
                                            alt={`Image ${index}`}
                                            className="w-full h-auto max-h-screen rounded-lg"
                                        />
                                    ) : (
                                        <video
                                            src={mediaUrl}
                                            controls
                                            className="w-full h-auto max-h-screen rounded-lg"
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}


        </div>
    );
};

export default ReviewByMedia;
