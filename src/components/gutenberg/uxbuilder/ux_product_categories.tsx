import { ProductCategories } from "@/components/product-categories";
import { getProductCategoriesAction } from "../actions";
import { Suspense } from "react";

export function UxProductCategories({ options } : { options: { [key: string]: any }; }) {

    const ids = options.ids ?? "";

    // Create array shimmer with length = products
    // let shimmers = productsLength > 0 ? Array.from({ length: productsLength }) : [];

    const idCategories: number[] = ids.split(",").reduce((result: number[], value: string) => {
        if (value && parseInt(value)) {
            return [...result, parseInt(value)];
        }
        return result;
    }, []);

    let query = {
        page: 1,
        per_page: idCategories.length > 0 ? idCategories.length: 10,
        include: idCategories,
        // order: ordersupports.includes(order) ? order : 'asc',
        // orderby: orderbysupports.includes(orderby) ? orderby : 'date',
        // ...(options?.ids && { include: options.ids }),
        // ...(options?.tags && { tag: options.tags, tag_operator: 'in' }),
        // ...(options?.cat && { category: options.cat, category_operator: 'in' }),
    };

    return (
        <Suspense fallback={<div>loading</div>}>
            <ProductCategories
                options={options}
                categoriesPromise={getProductCategoriesAction(query)}
            />
        </Suspense>
    )
}