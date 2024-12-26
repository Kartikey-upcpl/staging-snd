'use client'

import Link from "next/link";

import { ApiError, isApiError } from "@/lib/type-guards";
import { Category } from "@/lib/wordpress/types";
import { useEffect, useState, useMemo, use } from "react";
import { classnames } from "@/utlis/classnames";
import { usePathname } from 'next/navigation';

export default function CategoryList({ categoriesPromise }: { categoriesPromise: Promise<Category[] | ApiError> }) {
    const categories = use(categoriesPromise);
    const [ showList, setShowList ] = useState(false);
    const pathname = usePathname();

    const isCollection = useMemo(() => pathname.startsWith('/collections'), [pathname]);
    
    useEffect(() => {
        const element: HTMLElement | null = document.getElementById("header-categories-nav");
        element?.addEventListener('mouseover', () => {
            setShowList(true);
        });
        element?.addEventListener('mouseout', () => {
            setShowList(false);
        });

        return () => {
            element?.removeEventListener('mouseover', () => {});
            element?.removeEventListener('mouseout', () => {});
        };
    }, []);

    return (
        <div id="header-categories-nav" className="categories-nav position-relative">
            <h3 className="categories-nav__title d-flex align-items-center gap-4 fs-13 fw-semi-bold bg-white color-body">
                <svg
                    className="nav-icon"
                    width="25"
                    height="18"
                    viewBox="0 0 25 18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <use href="#icon_nav" />
                </svg>
                <span>Categories</span>
                <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <use href="#icon_down" />
                </svg>
            </h3>
            <ul
                className={classnames(
                    "categories-nav__list list-unstyled",
                    {
                        "!opacity-100 !visible": showList,
                        "!opacity-0 !invisible": !showList,
                    }
                )}
            >
                {isApiError(categories) ? <li>Error!</li> : categories.filter((category) => category.parent === 0).map((category) => (
                    <li key={category.id} className="categories-nav__item">
                        {
                            !isCollection ? 
                            <Link
                                href={`/collections/${category.slug}`}
                                onClick={(e) => {
                                    showList && setShowList(false);
                                }}
                            >
                                {category.name}
                            </Link> :
                            <a
                                href={`/collections/${category.slug}`}
                                onClick={(e) => {
                                    showList && setShowList(false);
                                    window.history.pushState({}, '', `/collections/${category.slug}`);
                                    e.preventDefault();
                                }}    
                            >{category.name}
                            </a>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}