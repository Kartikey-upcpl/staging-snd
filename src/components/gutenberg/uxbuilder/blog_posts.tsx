import { Suspense } from "react";

import { getPostsAction } from "../actions";
import type { WpPost } from "@/lib/wordpress/types";

import Shimmer from "@/components/shimmer/Shimmer";
import { BlogPosts } from "@/components/posts";
import { ShimmerPosts } from "@/components/posts/shimmer";

function getWidthColumn(columns: any): string | null {
    const value: number | null = columns && !isNaN(Number(columns)) && Number(columns) > 0 ? Number(columns) : null;
    if (value !== null) {
        return `${100 / value}%`
    }

    return null;
}

function convertOptions(options: { [key: string]: any }): { [key: string]: any } {
    const columns: number = options?.columns ?? 1;
    const responsiveColumns: any[] = options?.["$responsive"]?.["columns"] ?? [];
    const colSpacing = options.colSpacing ?? "";

    let responsiveSliderWidthItem = [...responsiveColumns];

    for (let i = 0; i < responsiveSliderWidthItem.length; i++) {
        responsiveSliderWidthItem[i] = getWidthColumn(responsiveSliderWidthItem[i]);
    }

    let sliderPadding = "0px 15px";
    let containerMargin = "0px -15px";

    switch (colSpacing) {
        case "collapse":
            sliderPadding = "0px";
            containerMargin = "0px";
            break;
        case "xsmall":
            sliderPadding = "0px 2px";
            containerMargin = "0px -2px";
            break;
        case "small":
            sliderPadding = "0px 10px";
            containerMargin = "0px -10px";
            break;
        case "large":
            sliderPadding = "0px 30px";
            containerMargin = "0px -30px";
            break;
    }

    return {
        ...options,
        sliderMarginContainer: containerMargin,
        sliderPadding: sliderPadding,
        sliderWidthItem: getWidthColumn(columns),
        "$responsive": {
            ...(options?.["$responsive"] ?? {}),
            sliderWidthItem: responsiveSliderWidthItem,
        }
    }
}

export function BlogPostsElement(props: {
    options: { [key: string]: any };
}) {

    // const [posts, setPosts] = useState<WpPost[]>([]);
    // const [loading, setLoading] = useState(true);

    const posts = !isNaN(Number(props.options.posts)) ? Number(props.options.posts) : 10;
    let query = {
        per_page: posts,
        status: "publish"
    };
    const postPromise: Promise<WpPost[]> = getPostsAction(query);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const posts = !isNaN(Number(props.options.posts)) ? Number(props.options.posts) : 10;
    //             let query = {
    //                 per_page: posts,
    //                 status: "publish"
    //             };
    //             const data: WpPost[] = await getPostsAction(query);

    //             setPosts(data);
    //             setLoading(false);
    //         } catch (e) {
    //             setLoading(false);
    //         }
    //     }

    //     fetchData();
    // }, [props.options]);

    // const handlePrev = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slidePrev();
    // }, []);

    // const handleNext = useCallback(() => {
    //     if (!sliderRef.current) return;
    //     sliderRef.current.swiper.slideNext();
    // }, []);

    // const key = "blog_posts-" + randomGeneralKey().toString();

    const options = convertOptions(props.options);

    const type = options.type ?? "slider";
    const width = options.width ?? "";
    const autoSlide = options.autoSlide ?? "";
    const sliderBullets = options.sliderBullets === "true";

    const postsLength = !isNaN(Number(props.options.posts)) ? Number(props.options.posts) : 10;

    const rules = {
        sliderMarginContainer: {
            selector: ".swiper-container",
            property: "margin"
        },
        sliderWidthItem: {
            selector: ".swiper-slide",
            property: "width"
        },
        sliderPadding: {
            selector: ".swiper-slide",
            property: "padding"
        }
    }


    return (
        <Suspense fallback={<ShimmerPosts options={options} />}>
            <BlogPosts options={props.options} postsPromise={postPromise} />
        </Suspense>
    );
}

