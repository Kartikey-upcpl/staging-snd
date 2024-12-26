import React from 'react';
import { useBreadcrumb, UseBreadcrumbProps } from 'react-instantsearch';
import BreadCrumb, { BreadCrumbType } from '../ui/BreadCrumb';

export default function CustomBreadcrumb(props: UseBreadcrumbProps) {
    const { items, createURL } = useBreadcrumb(props);

    const breadCrumbs: BreadCrumbType[] = React.useMemo(() => {
        var data: BreadCrumbType[] = [
            {
                name: "Home",
                href: "/",
                isLink: true,
            }
        ];

        if (items.length > 0) {
            items.forEach((item, index) => {
                const isLast = index === items.length - 1;
                data = [
                    ...data,
                    {
                        name: item.label,
                        href: createURL(item.value),
                        isLink: !isLast,
                    }
                ];
            });
        } else {
            data = [
                ...data,
                {
                    name: "Collections",
                    href: "/collections",
                    isLink: false,
                }
            ];
        }
        return data;
    }, [items, createURL]);

    return (
        <BreadCrumb
            items={breadCrumbs}
        />
    );
}