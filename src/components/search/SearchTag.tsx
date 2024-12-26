'use client';

// https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/react/#with-nextjs

import { useState, use } from "react";

import { Stats } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { searchClient as typesenceSearchClient } from '@/lib/typesense/client';
import type { UiState } from 'instantsearch.js';
import { PRODUCT_COLLECTIONS } from "@/lib/constants";

import { ModalPanel } from '@/components/ui/Modal';
import BreadCrumb from "@/components/ui/BreadCrumb";
import CustomHits from "./CustomHits";
import CustomSortBy from "./CustomSortBy";
import CustomPagination from "./CustomPagination";

import Accordion from '@/components/ui/Accordion';
import CustomPrice from "./CustomPrice";
import CustomButtonClearAll from "./CustomButtonClearAll";
import { CustomMenuTag } from './CustomTag';

import type { Tag } from "@/lib/wordpress/types";
import { ApiError, isApiError } from "@/lib/type-guards";

interface SearchTagProps {
    slug: string;
    searchClient?: any;
    tagsPromise: Promise<Tag[] | ApiError>;
}

const indexName = PRODUCT_COLLECTIONS;
const itemPerRow = [2, 3, 4];
const stepPrice = Math.pow(10, 2);

export default function SearchTag({
    slug,
    searchClient = typesenceSearchClient,
    tagsPromise,
}: SearchTagProps) {
    const listTag = use(tagsPromise);

    const [currentSlug, setCurrentSlug] = useState(slug);
    const [selectedColView, setSelectedColView] = useState(3);
    const [isOpen, setIsOpen] = useState(false);
    let tags: Tag[] = [];

    if (!isApiError(listTag)) {
        tags = listTag;
    }

    const openFilter = () => setIsOpen(true);
    const closeFilter = () => setIsOpen(false);

    const tag = tags.find(t => t.slug === currentSlug);

    const breadcrumbs = tag ? [
        {
            name: "Home",
            href: "/",
            isLink: true,
        },
        {
            name: `Products tagged “${tag.name}”`,
            href: `/product-tag/${tag.slug}`,
            isLink: false,
        }
    ] : [
        {
            name: "Home",
            href: "/",
            isLink: true,
        },
    ];;

    return (
        <section className="shop-main container d-flex py-6 bg-white">
            <InstantSearchNext
                indexName={indexName}
                searchClient={searchClient}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
                routing={{
                    router: {
                        cleanUrlOnDispose: false,
                        createURL({ qsModule, routeState, location }) {
                            const urlParts = location.href.match(/^(.*?)\/product-tag/);
                            const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

                            const data = routeState[indexName] || {};

                            const { page, sortBy, range, menu } = data;

                            const tagPath = menu?.["tags.slug"] ?? '';

                            const queryParameters: { [key: string]: any } = {};

                            if (page !== 1) {
                                queryParameters.page = page;
                            }

                            // Sort by
                            if (sortBy) {
                                switch (sortBy) {
                                    case indexName + '/sort/price:asc':
                                        queryParameters.orderby = 'price';
                                        break;
                                    case indexName + '/sort/price:desc':
                                        queryParameters.orderby = 'price-desc';
                                        break;
                                    default:
                                        // Remove the sortBy parameter
                                        delete queryParameters.orderby;
                                        break;
                                }
                            }

                            if (!!range?.price && range.price.split(":").length === 2) {
                                const splitPrice = range.price.split(":");
                                const min = splitPrice[0];
                                const max = splitPrice[1];

                                if (!!min) {
                                    queryParameters.min_price = `${Number(min) / stepPrice}`;
                                }

                                if (!!max) {
                                    queryParameters.max_price = `${Number(max) / stepPrice}`;
                                }
                            }

                            const queryString = qsModule.stringify(queryParameters, {
                                addQueryPrefix: true,
                                arrayFormat: 'repeat',
                            });

                            return `${baseUrl}product-tag/${tagPath}${queryString}`;
                        },
                        parseURL({ qsModule, location }) {
                            const { page, rating, orderby, min_price, max_price } = qsModule.parse(
                                location.search.slice(1)
                            );

                            const slugTag = location.pathname.replace('/product-tag/', '');
                            const ratingMenu: { [key: string]: any } = {};
                            if (rating) {
                                ratingMenu.average_rating = rating;
                            }

                            const menu: { [key: string]: any } = {};
                            menu["tags.slug"] = slugTag;

                            // Order by
                            let sortBy;
                            if (orderby) {
                                switch (orderby) {
                                    case 'price':
                                        sortBy = indexName + '/sort/price:asc';
                                        break;
                                    case 'price-desc':
                                        sortBy = indexName + '/sort/price:desc';
                                        break;
                                }
                            }

                            // Price
                            let min = "";
                            let max = "";

                            if (typeof min_price === "string" && !!min_price && !isNaN(Number(min_price))) {
                                min = `${Number(min_price) * stepPrice}`;
                            }

                            if (typeof max_price === "string" && !!max_price && !isNaN(Number(max_price))) {
                                max = `${Number(max_price) * stepPrice}`;
                            }

                            if (currentSlug !== slugTag) {
                                setCurrentSlug(slugTag);
                            }
                            return {
                                [indexName]: {
                                    page,
                                    range: {
                                        price: `${min}:${max}`,
                                    },
                                    sortBy,
                                    menu,
                                }
                            } as UiState;
                        },
                        push(url) {
                            window.history.pushState({}, '', url);
                        }
                    }
                }}
            >
                <div className="shop-sidebar side-sticky">
                    <Filter tags={tags} />
                </div>
                <div className="shop-list flex-grow-1">
                    <div className="d-flex justify-content-between mb-4 pb-md-2">
                        <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
                            <BreadCrumb items={breadcrumbs} />
                        </div>

                        <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                            <Stats
                                translations={{
                                    rootElementText({ nbHits, processingTimeMS }) {
                                        return `${nbHits.toLocaleString()} results found in ${processingTimeMS.toLocaleString()}ms`;
                                    }
                                }}
                            />
                            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0 flex-wrap justify-center"></div>
                            <div className="hidden sm:block">
                                <CustomSortBy
                                    items={[
                                        { label: 'Relevancy', value: indexName },
                                        { label: 'Price (asc)', value: indexName + '/sort/price:asc' },
                                        { label: 'Price (desc)', value: indexName + '/sort/price:desc' }
                                    ]}
                                />
                            </div>
                            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

                            <div className="col-size align-items-center order-1 d-none d-lg-flex">
                                <span className="text-uppercase fw-medium me-2">View</span>
                                {itemPerRow.map((elm, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColView(elm)}
                                        className={`btn-link fw-medium me-2 js-cols-size ${selectedColView == elm ? "btn-link_active" : ""
                                            } `}
                                    >
                                        {elm}
                                    </button>
                                ))}
                            </div>
                            {/* <!-- /.col-size --> */}

                            <div className="d-lg-none floating-bar align-items-center w-3/5	mx-auto flex justify-between shadow-xl rounded-xl">
                                {/* CustomSortBy Component */}
                                <div className=" d-flex align-items-center ">
                                    <CustomSortBy
                                        items={[
                                            { label: 'Relevancy', value: indexName },
                                            { label: 'Price (asc)', value: indexName + '/sort/price:asc' },
                                            { label: 'Price (desc)', value: indexName + '/sort/price:desc' }
                                        ]}
                                    />
                                </div>
                                <div className="w-0.5 bg-gray-400 h-10 right-24 absolute"></div>
                                {/* Filter Button */}
                                <div className="shop-filter d-flex align-items-center">
                                    <button
                                        className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside space-x-2"
                                        onClick={openFilter}
                                    >

                                        <span className="text-uppercase fw-medium d-inline-block align-middle ">
                                            Filter
                                        </span>
                                        <svg focusable="false" width="16" height="16" viewBox="0 0 16 16">
                                            <path d="M0 4h16M0 12h16" fill="none" stroke="currentColor" stroke-width=""></path>
                                            <circle cx="5" cy="4" r="2" fill="rgb(var(--background))" stroke="currentColor" stroke-width="2"></circle>
                                            <circle cx="11" cy="12" r="2" fill="rgb(var(--background))" stroke="currentColor" stroke-width="2"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* <!-- /.col-size d-flex align-items-center ms-auto ms-md-3 --> */}
                        </div>
                        {/* <!-- /.shop-acs --> */}
                    </div>
                    <CustomHits view={selectedColView} />
                    <CustomPagination />
                </div>
                <ModalPanel
                    isOpen={isOpen}
                    title="Filter By"
                    onClose={closeFilter}
                >
                    <div className="flex-1 py-7 px-10 overflow-y-auto relative">
                        <Filter tags={tags} />
                    </div>
                </ModalPanel>
            </InstantSearchNext>
        </section>
    );
}

function Filter({ tags }: { tags: Tag[] }) {
    return (
        <>
            <Accordion label="Tags">
                <CustomMenuTag attribute={"tags.slug"} tags={tags} />
            </Accordion>
            <Accordion label="Filter by Price">
                <CustomPrice attribute="price" />
            </Accordion>
            <CustomButtonClearAll />
        </>
    );
}