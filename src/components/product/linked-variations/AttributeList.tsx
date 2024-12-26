import React from "react";
import { classnames } from "@/utlis/classnames";
import { LinkedTerm } from "./util";
import Link from "next/link";

export default function AttributeList({ idProductSelected, terms }: { terms: LinkedTerm[], idProductSelected: number }) {

    return terms.map((term: LinkedTerm) => {
        return (
            <Link
                prefetch={true}
                href={idProductSelected !== term.product_id ? term.slug : "#"}
                key={term.slug}
                className={classnames(
                    "inline-block p-2 border !border-black rounded-md bg-white",
                    {
                        "!border-[#222222]": idProductSelected === term.product_id,
                    }
                )}
            >
                <div
                    className="bg-gray-100 text-center px-4 py-2 rounded text-sm text-gray-800"
                    dangerouslySetInnerHTML={{ __html: term.term.name }}
                />
            </Link>



        );
    });
}