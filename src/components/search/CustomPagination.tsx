import React from 'react';
import {
    usePagination,
    UsePaginationProps,
} from 'react-instantsearch';

export default function CustomPagination(props: UsePaginationProps) {
    const {
        pages,
        currentRefinement,
        nbPages,
        isFirstPage,
        isLastPage,
        refine,
    } = usePagination(props);
    const previousPageIndex = currentRefinement - 1;
    const nextPageIndex = currentRefinement + 1;

    if (nbPages < 2) {
        return undefined;
    }

    return (
        <nav
            className="shop-pages d-flex justify-content-between mt-3"
            aria-label="Page navigation"
        >
            <a
                href="#"
                className={`btn-link d-inline-flex align-items-center ${isFirstPage ? "disabled" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!isFirstPage) {
                        refine(previousPageIndex);
                    }
                }}
            >
                <svg
                    className="me-1"
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <use href="#icon_prev_sm" />
                </svg>
                <span className="fw-medium">PREV</span>
            </a>
            <ul className="pagination mb-0">
                {pages.map((page, index) => {
                    return (
                        <li key={index} className="page-item">
                            <a
                                className={`btn-link px-1 mx-2 ${currentRefinement === page ? "btn-link_active" : ""
                                    }`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    refine(page);
                                }}
                            >
                                {page + 1}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <a
                href="#"
                className={`btn-link d-inline-flex align-items-center ${isLastPage ? "disabled" : ""
                    }`}
                onClick={(e) => {
                    e.preventDefault();
                    if (!isLastPage) {
                        refine(nextPageIndex);
                    }
                }}
            >
                <span className="fw-medium me-1">NEXT</span>
                <svg
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <use href="#icon_next_sm" />
                </svg>
            </a>
        </nav>
    );
}