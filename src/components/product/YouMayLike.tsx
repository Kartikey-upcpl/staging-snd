"use client"
import React, { useEffect, useState } from 'react';
import { getRelatedProductById } from '../checkout/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

// Install Swiper modules

interface RelatedProductsProps {
    productIDs: number[] | undefined;
}

const style = `
    .woocommerce_deal_price > span > bdi {
        font-size:20px !important;
    }
`

interface Product {
    id: number;
    name: string;
    price_html: string; // Adjust as per the actual API response
    images: [
        {
            woocommerce_thumbnail: string
        }
    ];
    sale_price: string;
    regular_price: string;
    average_rating: string;
    discount_percentage: string;
    _deal_price_and_tag: {
        color: string;
        background: string
        name: string
    };
    slug: string
}

const YouMayLike: React.FC<RelatedProductsProps> = ({ productIDs }) => {
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            if (!productIDs) return;

            const fetchedProducts = await Promise.all(
                productIDs.map(async (id) => {
                    const response = await getRelatedProductById(id);
                    console.log("response", response)
                    return response; // Assuming getProductsAction returns the full product data
                })
            );
            console.log("fetchedProducts", fetchedProducts)
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, [productIDs]);

    const renderRatingStars = (averageRating: string) => {
        if (parseFloat(averageRating) === 0) return null; // Return nothing if averageRating is 0

        const rating = parseFloat(averageRating); // Convert average_rating to a number
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="product-rating">
                {Array(fullStars).fill(0).map((_, i) => (
                    <span key={`full-${i}`}>⭐</span>
                ))}
                {hasHalfStar && <span>⭐️</span>}
                {Array(emptyStars).fill(0).map((_, i) => (
                    <span key={`empty-${i}`}>☆</span>
                ))}
            </div>
        );
    };


    return (
        <div className="product-card flex space-x-5">
            {products.map((product) => (
                <div key={product?.id} className="product-card border-2 border-gray-300 p-2 rounded-xl sm:h-[26rem] h-[24rem]">
                    <div className="flex flex-col h-full justify-between  ">
                        <div>
                            <Link href={`/product/${product?.slug}`}>
                                <img
                                    src={product.images[0]?.woocommerce_thumbnail}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </Link>
                        </div>
                        <Link href={`/product/${product?.slug}`}>

                            <div className=''>
                                <p className="product-name">{product.name.slice(0, 50)}...</p>
                            </div>
                        </Link>
                        <div>
                            {renderRatingStars(product.average_rating)}

                        </div>
                        <div className="">
                            <span
                                className="current-price"
                                dangerouslySetInnerHTML={{ __html: product.price_html }}
                            />
                        </div>
                        <div className="product-summary">
                            <div className="woocommerce_deal_price">
                                <h3
                                    className="deal_price_tag"
                                    style={{
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        width: 'max-content',
                                        padding: '2px 10px',
                                        borderRadius: '2px',
                                        color: 'white',
                                        border: 0,
                                        height: 'auto',
                                        margin: '0',
                                        backgroundColor: product?._deal_price_and_tag?.background,
                                    }}
                                >
                                    {product?._deal_price_and_tag?.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default YouMayLike;