import clsx from "clsx";
import { getRowColumnClass } from "@/components/gutenberg/uxbuilder/ux_products";
import Shimmer from "@/components/shimmer/Shimmer";

export function ShimmerProducts({ options } : { options: { [key: string]: any } }) {
    const type = options.type ?? "slider";
    const width = options?.width ?? '';
    const colSpacing = options?.colSpacing ?? "";
    const responsive = options?.["$responsive"] ?? {};

    const smallColumns = getRowColumnClass(responsive['columns'], "small");
    const mediumColumns = getRowColumnClass(responsive['columns'], "medium");
    const largeColumns = getRowColumnClass(responsive['columns'], "large");
    
    const length = options?.products ? parseInt(options.products) : 10;
    const shimmers = Array.from({ length: length }) ;

    switch (type) {
        case "masonry":
        case "row":
            if (colSpacing === 'collapse') {
                return (
                    <div className="container">
                        <div className={clsx(["row gap-y-4", smallColumns, mediumColumns, largeColumns])}>
                            {shimmers.map((_, index) => {
                                return (<ShimmerItem key={index} className="col" />);
                            })}
                        </div>
                    </div>
                );
            }

            // Use bootstrap grid to create the layout
            return (
                <div className={clsx(["row gap-y-4", smallColumns, mediumColumns, largeColumns])}>
                    {shimmers.map((_, index) => {
                        return (<ShimmerItem key={index} className="col" />);
                    })}
                </div>
            );
        default:
            return (
                <div className={clsx(width !== "full-width" ? "container" : "")} style={{ position: "relative", }}>
                    <div className="overflow-hidden row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gx-md-4 gx-xl-5 flex-nowrap">
                        {shimmers.map((_, index) => {
                            return (<ShimmerItem key={index} className="col" />);
                        })}
                    </div>
                </div>
            );
    }
}

function ShimmerItem({ className }: { className?: string | undefined | null }) {
    return (
        <div className={clsx("product-card", { [className ?? ""]: !!className })}>
            <div className="pc__img-wrapper">
                <Shimmer loading tag="div" className="absolute inset-0" width="100%" height="100%" backgroundSize="800px 100%">
                    <div />
                </Shimmer>
            </div>

            <div className="pc__info position-relative">
                <Shimmer loading tag="h6" className="pc__title" width={150} height={18}>
                    Loading
                </Shimmer>

                <Shimmer loading tag="div" className="product-card__price d-flex" width={120} height={14}>
                    Loading
                </Shimmer>
                <Shimmer loading tag="div" className="product-card__review" width={80} height={12}>
                    Loading
                </Shimmer>
            </div>
        </div>
    );
}