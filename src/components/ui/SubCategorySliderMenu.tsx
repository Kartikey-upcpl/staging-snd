import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { socialLinks } from '@/data/footer';

interface Category {
    id: number;
    name: string;
    parent: number;
    children?: Category[];
    permalink: string;
}

interface SidebarMenuProps {
    listCat: Category[];
    onClose: () => void;
}

const ReadMoreItems = [
    { name: "About US", link: "/about-us" },
    { heading: "Our Policies", link: "#" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms of Service", link: "/terms-of-service" },
    { name: "Shipping Policy", link: "/shipping-policy" },
    { name: "Returns & Replacement Policy", link: "/returns-and-replacement-policy" },
];

const QuickSupportItems = [
    { name: "For Existing Order", link: "/support" },
    { name: "For New Order", link: "https://wa.me/919990233227?text=Hi%20I%20am%20interested%20in%20the%20following%20product.%20Can%20you%20please%20help" },
    { name: "Contacts", link: "/privacy-policy" },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ listCat, onClose }) => {
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [currentList, setCurrentList] = useState<null | { items: any[]; backLabel: string }>(null); // For Read More or Quick Support
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    const buildHierarchy = (categories: Category[]) => {
        const categoryMap: { [key: number]: Category } = {};
        const rootCategories: Category[] = [];

        categories.forEach((category) => {
            category.children = [];
            categoryMap[category.id] = category;
        });

        categories.forEach((category) => {
            if (category.parent === 0) {
                rootCategories.push(category);
            } else {
                if (categoryMap[category.parent]) {
                    categoryMap[category.parent].children?.push(category);
                }
            }
        });

        return rootCategories;
    };

    const hierarchicalCategories = buildHierarchy(listCat);

    const handleCategoryClick = (category: Category) => {
        if (category.children && category.children.length > 0) {
            setCurrentCategory(category);
        } else {
            window.location.href = category.permalink;
            onClose();
        }
    };

    const handleBackClick = () => {
        if (currentList) {
            setCurrentList(null);
        } else {
            setCurrentCategory(null);
        }
    };

    const renderButton = (label: string, onClick: () => void) => (
        <button className="text-blue-500 p-4 hover:underline" onClick={onClick}>
            ← {label}
        </button>
    );

    const renderItems = (items: any[]) => (
        <div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`flex justify-between items-center ${item?.name ? "text-[#666666D9]" : "text-black font-semibold"
                        } px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer mb-2`}
                    onClick={() => {
                        window.open(item.link, "_blank");
                        onClose();
                    }}
                >
                    <span>{item.name || item.heading}</span>
                </div>
            ))}
        </div>
    );

    const renderCategories = (categories: Category[]) => (
        <div>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex justify-between items-center text-[#666666D9] px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer "
                    onClick={() => handleCategoryClick(category)}
                >
                    <span>{category.name}</span>
                    {category.children && category.children.length > 0 && (
                        <span className="text-gray-500">▶</span>
                    )}
                </div>
            ))}
        </div>
    );
    const renderFixedElements = () => (
        <div className="text-[#666666D9]">
            <div className=" cursor-pointer">
                <Image
                    alt="snd care image"
                    src={`${url}/wp-content/uploads/2022/07/care_logo_hori.png`}
                    width={200}
                    height={100}
                    className="flex-grow text-left mb-2 py-2"
                    onClick={onClose}
                />
            </div>
            <Link href="track-order" className="mb-2 ">
                <p className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer">
                    Track Your Order By ID
                </p>
            </Link>
            <Link href="login" className="mb-2 ">
                <p className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer">
                    Login
                </p>
            </Link>
            <Link href="/blog-baby-care-and-pregnancy-care" className="mb-2 ">
                <p className="flex  items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer">
                    Blog
                </p>
            </Link>
            <div
                className=" flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer"
                onClick={() => setCurrentList({ items: ReadMoreItems, backLabel: "Main Menu" })}
            >
                <span>Read More</span>
                <span className="text-gray-500">▶</span>
            </div>
            <div
                className=" flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer"
                onClick={() => setCurrentList({ items: QuickSupportItems, backLabel: "Main Menu" })}
            >
                <span>Quick Support</span>
                <span className="text-gray-500">▶</span>
            </div>
            <ul className="flex  justify-center px-2 mt-6 items-center">
                {socialLinks.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.href}
                            className="footer__social-link d-block"
                        >
                            <svg
                                className={`${link.className} !text-black`}
                                width={link.width}
                                height={link.height}
                                viewBox={link.viewBox}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {typeof link.icon === "string" ? (
                                    <use href={link.icon} />
                                ) : (
                                    link.icon
                                )}
                            </svg>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="transition-all duration-300">
            {currentList ? (
                <>
                    {renderButton(currentList.backLabel, handleBackClick)}
                    {renderItems(currentList.items)}
                </>
            ) : currentCategory ? (
                <>
                    {renderButton(currentCategory.name, handleBackClick)}
                    {renderCategories(currentCategory.children || [])}
                </>
            ) : (
                <>
                    {renderCategories(hierarchicalCategories)}
                    {renderFixedElements()}
                </>
            )}
        </div>
    );
};

export default SidebarMenu;
