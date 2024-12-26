'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const wishList: number[] = [3, 4, 5];
const wishlistProducts: any[] = [
    {
        id: 3,
        slug: "view",
        imgSrc: "https://staranddaisy.in/wp-content/uploads/2022/04/5214789-fgh.jpg",
        category: "cate",
        title: "title",
        price: "443.5",
    }
];

export default function WishlistDashboard() {
    return (
        <div className="page-content my-account__wishlist">
            {wishList.length ? (
                <div
                    className="products-grid row row-cols-2 row-cols-lg-3"
                    id="products-grid"
                >
                    {" "}
                    {wishlistProducts.map((elm, i) => (
                        <div className="product-card-wrapper" key={i}>
                            <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                                <div className="pc__img-wrapper">
                                    <Link href={`/product/${elm.slug}`}>
                                        <Image
                                            loading="lazy"
                                            src={elm.imgSrc}
                                            width="330"
                                            height="400"
                                            alt="Cropped Faux leather Jacket"
                                            className="pc__img"
                                        />
                                    </Link>
                                    <button
                                        className="btn-remove-from-wishlist"
                                    //   onClick={() => toggleWishlist(elm.id)}
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <use href="#icon_close" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="pc__info position-relative">
                                    <p className="pc__category">{elm.category}</p>
                                    <h6 className="pc__title">{elm.title}</h6>
                                    <div className="product-card__price d-flex">
                                        <span className="money price">${elm.price}</span>
                                    </div>

                                    <button
                                        className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist active"
                                        title="Remove From Wishlist"
                                    //   onClick={() => toggleWishlist(elm.id)}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <use href="#icon_heart" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="fs-18">No products added to wishlist yet</div>
            )}
            {/* <!-- /.products-grid row --> */}
        </div>
    );
}