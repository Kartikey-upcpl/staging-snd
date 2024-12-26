'use client';

// https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/react/#with-nextjs

import { useState, use } from "react";

import { Stats } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { searchClient as typesenceSearchClient } from '@/lib/typesense/client';
import type { UiState } from 'instantsearch.js';
import { PRODUCT_COLLECTIONS } from "@/lib/constants";

import { ModalPanel } from '@/components/ui/Modal';
import CustomHits from "./CustomHits";
import CustomSortBy from "./CustomSortBy";
import CustomBreadcrumb from "./CustomBreadcrumb";
import CustomPagination from "./CustomPagination";

import Accordion from '@/components/ui/Accordion';
import CustomHierarchicalMenu from './CustomHierarchicalMenu';
import CustomToggleRefinement from './CustomToggleRefinement';
import { CustomRating } from "./CustomRating";
import CustomPrice from "./CustomPrice";
import CustomButtonClearAll from "./CustomButtonClearAll";
import { CustomDeal } from './CustomDeal';
import { CustomTag } from './CustomTag';

import type { Category, Tag } from "@/lib/wordpress/types";
import { ApiError, isApiError } from "@/lib/type-guards";

interface SearchProps {
    searchClient?: any;
    categoriesPromise: Promise<Category[] | ApiError>;
    tagsPromise: Promise<Tag[] | ApiError>;
}

const indexName = PRODUCT_COLLECTIONS;
const itemPerRow = [2, 3, 4];
const stepPrice = Math.pow(10, 2);

export default function Search({
    searchClient = typesenceSearchClient,
    categoriesPromise,
    tagsPromise,
    //    serverState,
    //    serverUrl,
    //    onSearchParameters,
    //    widgetsCollector,
    //    ...props
}: SearchProps) {
    const listCat = use(categoriesPromise);
    const listTag = use(tagsPromise);

    const [selectedColView, setSelectedColView] = useState(4);
    const [isOpen, setIsOpen] = useState(false);
    let categories: Category[] = [];
    let tags: Tag[] = [];

    if (!isApiError(listCat)) {
        categories = listCat;
    }

    if (!isApiError(listTag)) {
        tags = listTag;
    }

    function getCategorySlug(name: string) {
        const category = categories.find((category) => category.name === name);
        if (!category) {
            return '';
        }
        return category.slug;
    }

    function getCategoryName(slug: string) {
        const category = categories.find((category) => category.slug === slug);
        if (!category) {
            return '';
        }
        return category.name;
    }

    const openFilter = () => setIsOpen(true);
    const closeFilter = () => setIsOpen(false);

    return (
        <section className="shop-main container-fit d-flex py-6 bg-white">
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
                            const urlParts = location.href.match(/^(.*?)\/collections/);
                            const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

                            const data = routeState[indexName] || {};

                            const { page, hierarchicalMenu, toggle, ratingMenu, sortBy, range, refinementList } = data;

                            const categoryPath = hierarchicalMenu?.['categories.lvl0']?.map(getCategorySlug)?.join('/') ?? '';

                            const queryParameters: { [key: string]: any } = {};

                            if (page !== 1) {
                                queryParameters.page = page;
                            }

                            if (toggle?.on_sale) {
                                queryParameters.on_sale = toggle!.on_sale;
                            }

                            if (toggle?.is_in_stock) {
                                queryParameters.is_in_stock = toggle!.is_in_stock;
                            }

                            if (ratingMenu?.average_rating) {
                                queryParameters.rating = ratingMenu?.average_rating
                            }

                            if (!!refinementList?.deal && refinementList.deal.length > 0) {
                                queryParameters.deal = refinementList.deal.map(encodeURIComponent);
                            }

                            if (!!refinementList?.["tags.slug"] && refinementList["tags.slug"].length > 0) {
                                queryParameters.tags = refinementList["tags.slug"];
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

                            return `${baseUrl}collections/${categoryPath}${queryString}`;
                        },
                        parseURL({ qsModule, location }) {
                            const pathnameMatches = location.pathname.match(/collections\/(.*?)\/?$/);
                            const categories = pathnameMatches?.[1].split('/').map(getCategoryName)?.filter(c => c !== "");
                            const { page, on_sale, is_in_stock, rating, orderby, min_price, max_price, deal, tags } = qsModule.parse(
                                location.search.slice(1)
                            );

                            const toggle: { [key: string]: any } = {};

                            if (on_sale) {
                                toggle.on_sale = on_sale;
                            }

                            if (is_in_stock) {
                                toggle.is_in_stock = is_in_stock;
                            }

                            const ratingMenu: { [key: string]: any } = {};
                            if (rating) {
                                ratingMenu.average_rating = rating;
                            }

                            const refinementList: { [key: string]: any } = {};

                            if (deal) {
                                const valueDeal: any[] = Array.isArray(deal) ? deal : [deal].filter(Boolean);
                                refinementList.deal = valueDeal.map(decodeURIComponent);
                            }

                            if (tags) {
                                const valueTags: any[] = Array.isArray(tags) ? tags : [tags].filter(Boolean);
                                refinementList["tags.slug"] = valueTags.map(decodeURIComponent);
                            }

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

                            return {
                                [indexName]: {
                                    page,
                                    toggle,
                                    ratingMenu,
                                    sortBy,
                                    range: {
                                        price: `${min}:${max}`,
                                    },
                                    hierarchicalMenu: !!categories && categories.length > 0 ? {
                                        'categories.lvl0': categories,
                                    } : undefined,
                                    refinementList,
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
                        <div className="breadcrumb mb-0 flex-grow-1 items-center justify-center w-full sm:justify-start sm:w-auto">
                            <CustomBreadcrumb
                                attributes={[
                                    'categories.lvl0',
                                    'categories.lvl1',
                                    'categories.lvl2',
                                    'categories.lvl3'
                                ]}
                            />
                        </div>

                        {/* <!-- /.breadcrumb --> */}
                        <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                            <div className="hidden sm:block">
                                <Stats
                                    translations={{
                                        rootElementText({ nbHits, processingTimeMS }) {
                                            return `${nbHits.toLocaleString()} results found in ${processingTimeMS.toLocaleString()}ms`;
                                        }
                                    }}
                                />
                            </div>
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
                            <div className="d-md-none floating-bar align-items-center w-3/5 sm:w-2/6 mx-auto flex justify-between shadow-xl rounded-xl">
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
                                <div className="w-0.5 bg-gray-400 h-10 right-[5.9rem] sm:right-28  absolute"></div>
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
        </section >
    );
}

function Filter({ tags }: { tags: Tag[] }) {
    return (
        <>
            <Accordion label="Product category">
                <CustomHierarchicalMenu
                    attributes={[
                        'categories.lvl0',
                        'categories.lvl1',
                        'categories.lvl2',
                        'categories.lvl3'
                    ]}
                />
            </Accordion>
            <Accordion label="Deal">
                <CustomDeal attribute='deal' />
            </Accordion>
            <Accordion label="Tags">
                <CustomTag attribute={"tags.slug"} tags={tags} />
            </Accordion>
            <Accordion label="Filter Stock">
                <CustomToggleRefinement attribute="is_in_stock" on={true} label='In stock' />
                <CustomToggleRefinement attribute="on_sale" on={true} label='On sale' />
            </Accordion>
            <Accordion label="Rating">
                <CustomRating attribute="average_rating" max={6} />
            </Accordion>
            <Accordion label="Filter by Price">
                <CustomPrice attribute="price" />
            </Accordion>
            <CustomButtonClearAll />
        </>
    );
}