"use client"
import { WcProduct } from "@/lib/typesense/types/wc_product_type";
import { useCallback, useState } from "react";
import { classnames } from "@/utlis/classnames";

interface Props {
    wcProduct: WcProduct;
}

interface FAQItem {
    faq_question: string;
    faq_answer: string;
}

export default function FAQData({ wcProduct }: Props) {
    const data = wcProduct.acf['faq_data'] as FAQItem[] | undefined;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!data || !Array.isArray(data)) {
        return null;
    }

    return (
        <div className="flex justify-center py-3">
            <div className="sm:w-9/12	">
                {data.map((item, index) => (
                    <div key={index} className="mb-2 rounded-md overflow-hidden border border-gray-300">
                        <div
                            className={`flex justify-between items-center p-4 cursor-pointer font-semibold text-lg  ${openIndex === index ? 'bg-gray-100  text-red-400' : 'bg-gray-50 text-gray-700 '}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <span>{item.faq_question}</span>
                            <span>{openIndex === index ? '-' : '+'}</span>
                        </div>
                        {openIndex === index && (
                            <div className="p-4 bg-gray-100 text-gray-600">
                                <p>{item.faq_answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}