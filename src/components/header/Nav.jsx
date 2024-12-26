"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function Nav() {
    const pathname = usePathname();
    if (pathname === "/snd-vshop") {
        return null; // Do not render anything for this route
    }
    const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const categories = [
        {
            href: "/",
            imgSrc: `${url}/wp-content/uploads/2023/12/baby-gear-icon-new-1.png`,
            alt: "Baby Gears",
            label: "Gears",
        },
        {
            href: "/baby-basics/",
            imgSrc: `${url}/wp-content/uploads/2023/12/baby-basic-icon-new-1.png`,
            alt: "Baby Basics",
            label: "Basics",
        },
        {
            href: "/kids-furniture-toys-games-rideons-scooter-bunkbed-tricycle-bicycle",
            imgSrc: `${url}/wp-content/uploads/2023/12/kids_icon_kp-1.png`,
            alt: "Kids Play Time",
            label: "Kids",
        },
        {
            href: "/toy-world",
            imgSrc: `${url}/wp-content/uploads/2023/12/snd-toy-world-2-1-1.png`,
            alt: "Toy World",
            label: "Toy World",
        },
        {
            href: "/clothings",
            imgSrc: `${url}/wp-content/uploads/2023/12/kids-clothing-icon-new-1.png`,
            alt: "Kids Fashion",
            label: "Fashion",
        },
        {
            href: "/snd-homes",
            imgSrc: `${url}/wp-content/uploads/2023/12/sndhome_logo-1.png`,
            alt: "SND Homes",
            label: "SND Homes",
        },
        {
            href: "/care",
            imgSrc: `${url}/wp-content/uploads/2023/12/care-logo-168000-2-1.png`,
            alt: "SND Care",
            label: "Care",
        },
    ];

    const CategoryItem = ({ href, imgSrc, alt, label }) => (
        <div className="shadow-md border border-gray-200 rounded-lg p-2 bg-gray-100 max-h-24 min-w-24 ">
            <Link href={href} className="flex flex-col items-center">
                <Image
                    width={60}
                    height={60}
                    src={imgSrc}
                    alt={alt}
                    className=" object-contain rounded-lg transition-transform duration-500 hover:scale-110"
                />
                <p className="text-sm font-medium text-gray-800 ">{label}</p>
            </Link>
        </div>
    );

    return (

        <>
            <section className="my-4">
                <div className="container-fit mx-auto">
                    <div className="flex justify-center space-x-2">
                        {categories.map((category, index) => (
                            <CategoryItem
                                key={index}
                                href={category.href}
                                imgSrc={category.imgSrc}
                                alt={category.alt}
                                label={category.label}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
        // <>
        //     <li className="navigation__item ">

        //         <Link
        //             href="/"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/" })}
        //         >
        //             <Image className="" width={50} height={50} src={`${url}/wp-content/uploads/2023/12/baby-gear-icon-new-1.png`}
        //             />
        //             Gears
        //         </Link>
        //     </li >
        //     <li className="navigation__item ">
        //         <Link
        //             href="/baby-basics"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/baby-basics" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/baby-basic-icon-new-1.png`}
        //             />
        //             Basics
        //         </Link>
        //     </li>
        //     <li className="navigation__item ">
        //         <Link
        //             href="/kids-furniture-toys-games-rideons-scooter-bunkbed-tricycle-bicycle"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/kids-furniture-toys-games-rideons-scooter-bunkbed-tricycle-bicycle" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/kids_icon_kp-1.png`}
        //             />
        //             Kids
        //         </Link>
        //     </li>
        //     <li className="navigation__item ">

        //         <Link
        //             href="/toy-world"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/toy-world" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/snd-toy-world-2-1-1.png`}
        //             />
        //             Toy World
        //         </Link>
        //     </li>
        //     <li className="navigation__item ">
        //         <Link
        //             href="/clothings"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/clothings" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/kids-clothing-icon-new-1.png`}
        //             />
        //             Fashion
        //         </Link>
        //     </li>
        //     <li className="navigation__item ">
        //         <Link
        //             href="/snd-homes"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/snd-homes" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/sndhome_logo-1.png`}
        //             />
        //             SND Homes
        //         </Link>
        //     </li>
        //     <li className="navigation__item ">
        //         <Link
        //             href="/care"
        //             className={clsx("navigation__link flex  flex-col items-center", { "menu-active": pathname == "/care" })}
        //         >
        //             <Image width={50} height={50} src={`${url}/wp-content/uploads/2023/12/care-logo-168000-2-1.png`}
        //             />
        //             Care
        //         </Link>
        //     </li>
        // </>
    );
}
