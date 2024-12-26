'use client'
import { Fragment, useState, useRef, useEffect, useMemo, use } from 'react';
import { usePathname } from 'next/navigation';
import type { Category, Item } from '@/lib/wordpress/types';
import { MenuModalPanel, ModalPanel } from '@/components/ui/Modal';
import { ApiError, isApiError } from '@/lib/type-guards';
import Search from './Search';
import SidebarMenu from '../ui/SubCategorySliderMenu';


export default function MenuModal({ categoriesPromise }: { categoriesPromise: Promise<Category[] | ApiError> }) {
    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showList, setShowList] = useState(false);
    const listCat = use(categoriesPromise);

    let categories: Category[] = [];

    if (!isApiError(listCat)) {
        categories = listCat;
    }



    console.log("listCat", listCat)

    useEffect(() => {
        const element: HTMLElement | null = document.getElementById("header-categories-nav");
        element?.addEventListener('mouseover', () => {
            setShowList(true);
        });
        element?.addEventListener('mouseout', () => {
            setShowList(false);
        });

        return () => {
            element?.removeEventListener('mouseover', () => { });
            element?.removeEventListener('mouseout', () => { });
        };
    }, []);

    return (
        <>
            <button className='flex items-center' aria-label="Open cart" onClick={openMenu}>
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" /></svg>
            </button>
            <MenuModalPanel
                isOpen={isOpen}
                title={
                    <>
                        <div className='flex justify-center'>
                            <Search />
                        </div>
                    </>
                }
                onClose={closeMenu}
            >
                <div className=" overflow-y-scroll p-1 w-full py-3">
                    <SidebarMenu listCat={categories} onClose={closeMenu} />
                </div>
            </MenuModalPanel>

        </>
    );
}






