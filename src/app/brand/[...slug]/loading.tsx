import Shimmer from "@/components/shimmer/Shimmer";

function LoadinItemFiter() {
    return (
        <div className="accordion mt-1">
            <div className="accordion-item mb-4">
                <h5 className="accordion-header">
                    <div
                        className={"accordion-button p-0 border-0 fs-5 text-uppercase"}
                    >
                        <div className="flex-1">
                            <Shimmer loading width={170} height={20}>
                                Loading
                            </Shimmer>
                        </div>
                        <Shimmer loading width={20} height={20}>
                            <svg className="accordion-button__icon" viewBox="0 0 14 14">
                                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                                    <path
                                        className="svg-path-vertical"
                                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                                    />
                                    <path
                                        className="svg-path-horizontal"
                                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                                    />
                                </g>
                            </svg>
                        </Shimmer>
                        
                    </div>
                </h5>
                <div
                    className={"accordion-collapse show border-0 visible"}
                >
                    <div className="accordion-body px-0 pb-0">
                            <Shimmer loading className="mb-2" width={230} height={10}>
                                Loading
                            </Shimmer>
                            <Shimmer loading className="mb-2" width={230} height={10}>
                                Loading
                            </Shimmer>
                            <Shimmer loading className="mb-2" width={230} height={10}>
                                Loading
                            </Shimmer>
                            <Shimmer loading className="" width={230} height={10}>
                                Loading
                            </Shimmer>
                    </div>
                </div>
            </div>
            {/* /.accordion-item */}
        </div>
    );
}
export default function Loading() {
    const data = new Array(9).fill(0);
    return (
        <main className="page-wrapper-3 bg-light py-6">
            <section className="shop-main container d-flex py-6 bg-white">
                <div className="shop-sidebar side-sticky">
                    <LoadinItemFiter />
                    <LoadinItemFiter />
                    <LoadinItemFiter />
                    <LoadinItemFiter />
                </div>

                <div className="shop-list flex-grow-1">
                    <div className="d-flex justify-content-between mb-4 pb-md-2">
                        <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1 mt-2">
                            <Shimmer loading width={200} height={20}>
                                Loading
                            </Shimmer>
                        </div>
                        {/* <!-- /.breadcrumb --> */}

                        <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                            <Shimmer loading width={30} height={30}>
                                Loading
                            </Shimmer>
                            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0 flex-wrap justify-center"></div>
                            <Shimmer loading width={30} height={30}>
                                Loading
                            </Shimmer>
                            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

                            <Shimmer loading width={30} height={30}>
                                Loading
                            </Shimmer>
                            {/* <!-- /.col-size d-flex align-items-center ms-auto ms-md-3 --> */}
                        </div>
                        {/* <!-- /.shop-acs --> */}
                    </div>
                    <ol className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-3`}>
                        {data.map((_, i) => (
                            <li
                                key={i}
                                className='product-card-wrapper'
                            >
                                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                                    <Shimmer loading tag="div" className="pc__img-wrapper" width="100%" height="100%" backgroundSize="800px 100%">
                                        <div className="pc__img-wrapper" />
                                    </Shimmer>
                                    <div className="pc__info position-relative">
                                        {/* <p className="pc__category">{elm.category}</p> */}
                                        {/* <p className="pc__category" dangerouslySetInnerHTML={{__html: hit.categories?.map((c: any) => c.name).join(" | ")}}/> */}
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
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </main>
    )
}