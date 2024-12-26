import React from "react";
import { use } from "react";
import Link from "next/link";

import type { Product as ProductType } from "@/lib/typesense/typesense_type";
import { ProductTypeVariable, type Category } from "@/lib/wordpress/types";

import ShareComponent from "@/components/uomo/common/ShareComponent";

// import AddToCart from "./AddToCart";
import Slideshow from "./Slideshow";
import BreadCrumbProduct from "./BreadCrumb";
import Review from "./Review";
import AdditionalInfo from "./AdditionalInfo";
import ProductTypeContent from "./ProductType";
import Deal from '@/components/labels/Deal';
import PinCodeChecker from "./PincodeChecker";
import Countdown from "../ui/Countdown";
import { FloatStarRating } from "../ui/InputRating";
import LinkedVariations from "./linked-variations";
import type { WcProduct } from "@/lib/typesense/types";
import { getProductById } from "@/lib/wordpress";
import FeaturedVideo from "./FeaturedVideo";
import FeaturedImage from "./FeaturedImage";
import ManufacturerImporter from "./ManufacturerImporter";
import UserManual from "./UserManual";
import Offer from "./Offer";
import { getProductVariations } from "./actions";
import AwardBanner from "./AwardBanner";
import BrandData from "./BrandData";
import CountdownTimer from "../ui/Countdown";
import RelatedProducts from "./RelatedProducts";
import YouMayLike from "./YouMayLike";
import FAQData from "./faqData";
import ProductInformation from "./ProductInformation";
import ReviewByMedia from "./ReviewByMedia";
import RatingCard from "./RatingCard";

interface Props {
    product: ProductType;
    categories: Category[];
    wcProduct: WcProduct;
}

interface BrandDta {
    brand_name: string;
    brand_image: string;
}

interface DealPriceTimer {
    css?: string;
    html?: string;
    js?: string;
}

interface DealPriceTag {
    deal_price?: number;
    deal_price_timer?: DealPriceTimer;
}

interface ACFType {
    technical_details: []
    additional_information: []
}

export type Product = {
    id: number;
    name: string;
    award_banner: string;
    description: string;
    brand_data: BrandDta
    regular_price: string
    _deal_price_and_tag?: DealPriceTag;
    type: string;
    app_download_html: string
    sku: string
    categories: Category[];
    related_ids: []
    upsell_ids: []
    buy_it_with: string
    acf: ACFType
    reviewx_media: []
    rating_count: number
    average_rating: string
};

export default function Product({ product, categories, wcProduct }: Props) {
    const productVariation = product.type === ProductTypeVariable ? getProductVariations(product.id) : undefined;
    const productDetails = use(getProductById(product?.id)) as unknown as Product


    return (
        <section className="product-single pb-12 sm:max-w-[1080px]">
            <div className="container py-2">
                <AwardBanner productData={productDetails?.award_banner} />
            </div>
            <div className="container  pt-6 w-full lg:flex sm:space-x-5">
                <div className="col-lg-5 lg:w-1/2 max-w-full">
                    <Slideshow images={product.images} />
                    {/* <Slider4 /> */}
                </div>
                <div className=" lg:w-1/2 max-w-full  space-y-4 ">
                    {/* <div className="d-flex justify-content-between mb-4 pb-md-2">
                            <div className="product-single__prev-next d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                                <a className="text-uppercase fw-medium">
                                    <svg
                                        className="mb-1px"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 25 25"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <use href="#icon_prev_md" />
                                    </svg>
                                    <span className="menu-link menu-link_us-s">Prev</span>
                                </a>
                                <a className="text-uppercase fw-medium">
                                    <span className="menu-link menu-link_us-s">Next</span>
                                    <svg
                                        className="mb-1px"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 25 25"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <use href="#icon_next_md" />
                                    </svg>
                                </a>
                            </div>
                        </div> */}
                    <BreadCrumbProduct
                        category={product.categories?.[0]}
                        name={product.name}
                        categories={categories}
                    />
                    <div className="flex justify-between">
                        <BrandData wcProduct={productDetails?.brand_data} />
                        <ShareComponent title={product.name} />
                    </div>
                    <p className="text-[1.5rem] font-medium text-[#000055]" dangerouslySetInnerHTML={{ __html: product.name }} />
                    <div className="product-single__rating">
                        <div className="reviews-group d-flex">
                            <FloatStarRating value={parseFloat(product.average_rating)} />
                        </div>
                        <span className="reviews-note text-lowercase text-secondary ">
                            ( {product.review_count} customer reviews)
                        </span>
                    </div>
                    <div className="product-single__price">
                        <span className="current-price" dangerouslySetInnerHTML={{ __html: product.price_html }} />
                    </div>
                    <div className="">
                        <Deal deal={product.extensions['deal-price']} productData={productDetails} currencyCode={product.prices.currency_code} currencySymbol={product.prices.currency_symbol} />
                    </div>
                    <CountdownTimer />
                    {!!product.short_description && (
                        <div className="product-single__short-desc">
                            <p dangerouslySetInnerHTML={{ __html: product.short_description }} />
                        </div>
                    )}
                    <LinkedVariations product={product} />
                    <ProductTypeContent product={product} wcProduct={wcProduct} productVariationsPromise={productVariation} />
                    <PinCodeChecker />
                    {productDetails && (
                        <span
                            className="current-price"
                            dangerouslySetInnerHTML={{ __html: productDetails.app_download_html }}
                        />
                    )}
                    {/* <div className="product-single__addtolinks">
                        <a href="#" className="menu-link menu-link_us-s add-to-wishlist">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <use href="#icon_heart" />
                            </svg>
                            <span>Add to Wishlist</span>
                        </a>
                    </div> */}
                    <Offer wcProduct={wcProduct} />
                    {/* <div className="">SKU: <span>{productDetails?.sku}</span></div>

                    <div className="">Category:
                        <Link href={`/collections/baby/${productDetails?.categories[0]?.slug}`}>
                            {" "}
                            <span>
                                {productDetails?.categories[0]?.name}
                            </span>
                        </Link>
                    </div> */}
                </div>
            </div>
            <div className="product-single container bg-white">
                <div className="mt-5 py-6">
                    <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">
                        Buy It With
                    </h2>
                    <div className="px-4 mb-10">
                        <div dangerouslySetInnerHTML={{ __html: productDetails?.buy_it_with || "" }} />
                    </div>
                    <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">
                        Additional Information
                    </h2>
                    <div className="px-4 mb-10">
                        <AdditionalInfo product={product} />
                    </div>
                    <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">Description</h2>
                    <div className="px-4 mb-10">
                        <div className="product-single-description" dangerouslySetInnerHTML={{ __html: productDetails.description }} />
                    </div>
                    {(productDetails?.acf?.technical_details?.length > 0 || productDetails?.acf?.additional_information?.length > 0) && (
                        <>
                            <ProductInformation productDetails={productDetails} />
                        </>
                    )}

                    <FeaturedVideo wcProduct={wcProduct} />
                    <FeaturedImage wcProduct={wcProduct} />
                    <h2 className="bg-gray-100 py-2 px-4 text-base uppercase mb-4">
                        FAQS
                    </h2>
                    <div className="px-4 mb-10">
                        {wcProduct.acf['faq_data'] &&
                            <FAQData wcProduct={wcProduct} />
                        }
                    </div>
                    <ManufacturerImporter wcProduct={wcProduct} />
                    <UserManual wcProduct={wcProduct} />

                    <div className="">
                        <div className="">
                            <p className=" font-bold text-[#000055]">Reviews</p>
                        </div>
                        <div className="">
                            <p className="text-[#000055] font-semibold mb-5"><span className="text-xl">{productDetails?.rating_count} reviews for</span> {" "}{productDetails?.name} </p>
                            {productDetails?.reviewx_media && (
                                <ReviewByMedia mediaData={productDetails.reviewx_media} />
                            )}
                            <RatingCard average_rating={productDetails?.average_rating} rating_count={productDetails?.rating_count} />
                            <Review product={product} />
                        </div>
                    </div>
                    <div className="space-y-10">
                        {productDetails?.upsell_ids.length >= 1 &&
                            <div className="container space-y-2 ">
                                <div className="">
                                    <p className=" font-bold text-[#000055] ">YOU MAY ALSO LIKE</p>
                                </div>
                                <div className="">
                                    <YouMayLike productIDs={productDetails?.upsell_ids} />
                                </div>
                            </div>
                        }
                        {productDetails?.related_ids.length >= 1 &&
                            <div className="container space-y-2">
                                <div className="">
                                    <p className=" font-bold text-[#000055] ">RELATED PRODUCTS</p>
                                </div>
                                <div className="">
                                    <RelatedProducts productIDs={productDetails?.related_ids} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}