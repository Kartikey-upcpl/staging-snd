import React, { Suspense } from "react";
import { Products } from "@/components/products";
import { getProductsAction } from "@/components/gutenberg/actions";

import { ShimmerProducts } from "@/components/products/shimmer";

// order support: asc, desc
const ordersupports = ['asc', 'desc'];

// orderby support: date, modified, id, include, title, slug, price, popularity, rating, menu_order, comment_coun t
const orderbysupports = ['date', 'modified', 'id', 'include', 'title', 'slug', 'price', 'popularity', 'rating', 'menu_order', 'comment_count'];

export function getRowColumnClass(options: [string, null][], type: "small" | "medium" | "large"): string | null {

    if (options.length === 3) {
        const valueSm = options[0];
        const valueMd = options[1];
        const valueLg = options[2];

        switch (type) {
            case "medium":
                if (valueMd) {
                    return `row-cols-md-${valueMd}`;
                }
                return null;
            case "large":
                if (valueLg) {
                    return `row-cols-lg-${valueLg}`;
                }
                return null;
            case "small":
                return `row-cols-${valueSm ?? 2}`;
        }
    }

    return null;
}

export function UxProducts({ options }: { options: { [key: string]: any } }) {
    // const key = "product-grid-" + randomGeneralKey().toString();

    // const sliderRef: LegacyRef<SwiperRef> | null = useRef(null);

    // const [products, setProducts] = React.useState<Document[]>([]);
    // const [loading, setLoading] = React.useState(true);

    const type = options.type ?? "slider";
    const colSpacing = options?.colSpacing ?? "";
    const productsLength = options?.products ? parseInt(options.products) : 4;
    const responsive = options?.["$responsive"] ?? {};
    const order = options?.order ?? 'asc';
    const orderby = options?.orderby ?? 'date';
    const width = options?.width ?? '';
    const autoSlide = options.autoSlide ?? "";

    // Create array shimmer with length = products
    // let shimmers = productsLength > 0 ? Array.from({ length: productsLength }) : [];

    let query = {
        page: 1,
        per_page: options?.products ? parseInt(options.products) : 10,
        order: ordersupports.includes(order) ? order : 'asc',
        orderby: orderbysupports.includes(orderby) ? orderby : 'date',
        ...(options?.ids && { include: options.ids }),
        ...(options?.tags && { tag: options.tags, tag_operator: 'in' }),
        ...(options?.cat && { category: options.cat, category_operator: 'in' }),
    };


    // const products: Document[] = getProductsAction(query);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             let query = {
    //                 page: 1,
    //                 per_page: options?.products ? parseInt(options.products) : 10,
    //                 order: ordersupports.includes(order) ? order : 'asc',
    //                 orderby: orderbysupports.includes(orderby) ? orderby : 'date',
    //                 ...(options?.ids && { include: options.ids }),
    //                 ...(options?.tags && { tag: options.tags, tag_operator: 'in' }),
    //                 ...(options?.cat && { category: options.cat, category_operator: 'in' }),
    //             };
    //             const data: Document[] = await getProductsAction(query);

    //             setProducts(data);
    //             setLoading(false);
    //         } catch (e) {
    //             setLoading(false);
    //         }
    //     }

    //     fetchData();
    // }, [options]);

    // const handlePrev = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slidePrev();
    // }, []);

    // const handleNext = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slideNext();
    // }, []);

    return (
        <Suspense fallback={<ShimmerProducts options={options} />}>
            <Products options={options} productsPromise={getProductsAction(query)} />
        </Suspense>
    );

}
