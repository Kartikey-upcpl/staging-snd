import React from "react";
import Link from "next/link";

export type BreadCrumbType = {
    name: string;
    href: string;
    icon?: string | null | undefined; 
    isLink: boolean;
}

function BreadCrumbItem({name, icon} : { name: string, icon?: string | undefined | null} ) {
    if (!!icon) {
        return (
            <span className="uppercase">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-1"
                >
                    <use href={`#${icon}`} />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: name }} />
            </span>
        );
    }
    
    return (<span className="uppercase" dangerouslySetInnerHTML={{ __html: name }} />);
}
export default function BreadCrumb({ items }: { items: BreadCrumbType[] }) {

    if (items.length > 0) {
        var itemsRender: React.ReactNode[] = [];

        for (var i = 0; i < items.length; i++) {
            const item = items[i];
            if (i > 0) {
                itemsRender = itemsRender.concat(
                    <span key={`separator-${i}-${item.href}`} className="breadcrumb-separator menu-link font-medium ps-1 pe-1">
                        /
                    </span>
                );
            }

            itemsRender = itemsRender.concat(
                item.isLink
                ? (
                    <Link key={`link-breadcubl-${i}-${item.href}`} href={item.href} className="menu-link menu-link_us-s font-medium hover:text-red-600" >
                        <BreadCrumbItem name={item.name} icon={item.icon} />
                    </Link>
                ) : <BreadCrumbItem key={`link-breadcubl-${i}-${item.href}`} name={item.name} icon={item.icon} />
            );
        }

        return itemsRender.map((item) => item);
    }

    return undefined;
}
