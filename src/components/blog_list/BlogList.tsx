'use client';

import React, { use, useEffect, useState, ReactNode } from "react";
import { notFound, useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { WpPostPagination } from "@/lib/wordpress/types";
import { ApiError, isApiError } from "@/lib/type-guards";
import Image from "@/components/image/Image";
import Shimmer from "@/components/shimmer/Shimmer";

interface PropsType {
    postsPromise: Promise<WpPostPagination | ApiError>,
    page?: number,
    header: ReactNode,
    pathNamePagination: string,
}

export default function BlogList({postsPromise, page = 1, header, pathNamePagination }: PropsType) {
    const router = useRouter()

    const data = use(postsPromise);

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const dataShimmer = Array.from({ length: 10 });
    
    if (!isClient) {
        return (
            <div className="container text-center my-5">
                {header}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-4"  style={{rowGap: "30px"}}>
                    {dataShimmer.map((_, i: number) => (
                        <div key={i} className="col">
                            <div className="d-block bg-white border !border-gray-200 p-2 rounded-3">
                                <div>
                                    <Shimmer loading width={"100%"} height={250} backgroundSize="800px 250px">
                                        <div />
                                    </Shimmer>
                                </div>
                                <div className="text-center my-3 d-flex flex-col items-center px-3">
                                    <Shimmer loading width={"70%"} height={18}>
                                        <div />
                                    </Shimmer>
                                    <div className="w-[50px] h-0.5 bg-gray-100 my-2" />
                                    <Shimmer loading width={"85%"} height={12}>
                                        <div />
                                    </Shimmer>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isApiError(data)) {
        return notFound();
    }

    return (
        <div className="container text-center my-5">
            {header}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-4" style={{rowGap: "30px"}}>
                {data.data.map(post => (
                    <div key={post.id} className="col">
                        <a href={`/${post.slug}`} className="d-block bg-white border !border-gray-200 p-2 rounded-3 h-full">
                            <div>
                                <Image src={post.image ?? ""} style={{ width: "100%", height: "250px", objectPosition: "50% 50%", objectFit: "cover" }} />
                            </div>
                            <div className="text-center my-3 d-flex flex-col items-center px-3">
                                <h5 className="text-sm font-semibold line-clamp-2 text-clip" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <div className="w-[50px] h-0.5 bg-gray-100 my-2" />
                                <p className="text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered ?? "" }} />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            {data.totalPage > 1 && (
                <Pagination
                    pagination={data.totalPage}
                    currentVisit={page}
                    onChangePagination={(newPage) => {
                        if (newPage !== page) {
                            router.push(`${pathNamePagination}/page/${newPage}`);
                        }
                    }}
                />
            )}
            
        </div>
    );
}