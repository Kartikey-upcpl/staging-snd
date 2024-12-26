import clsx from "clsx";
import Shimmer from "@/components/shimmer/Shimmer";

export function ShimmerPosts({ options }: { options: { [key: string]: any } }) {
    const type = options.type ?? "slider";
    const width = options.width ?? "";

    const length = !isNaN(Number(options.posts)) ? Number(options.posts) : 10;
    const shimmers = Array.from({ length: length });

    switch (type) {
        default:
            return (
                <div className={clsx(width !== "full-width" ? "container" : "")} style={{ position: "relative", }}>
                    <div className="overflow-hidden row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-0 gx-md-4 gx-lg-4 flex-nowrap">
                        {shimmers.map((_, index) => {
                            return (<div key={index} className="col">
                                <ShimmerItem />
                            </div>);
                        })}
                    </div>
                </div>
            );
    }
}

function ShimmerItem() {
    return (
        <div className="position-relative overflow-hidden" >
            <div className="position-absolute top-0 left-0 right-0 h-[200px] overflow-hidden z-10">
                <Shimmer loading width="100%" height="100%" backgroundSize="800px 100%">
                    <div />
                </Shimmer>
            </div>
            <div className="bg-light p-4 mx-4 mt-[170px] position-relative z-50 flex flex-col items-center text-center">
                <Shimmer loading width="60%" height="18px" >
                    <div />
                </Shimmer>
                <div className="w-[50px] h-0.5 bg-gray-100 my-2" />
                <Shimmer loading width="85%" height="12px" >
                    <div />
                </Shimmer>
            </div>
        </div>
    );
}