import { classnames } from "@/utlis/classnames";
import React from "react";

export type BoxRadioListOptionType = {
    key: string,
    title: string,
    subtitle?: string,
    description?: string,
}

interface PropsType {
    options: BoxRadioListOptionType[],
    selected?: string | undefined | null,
    onSelected?: (value: string) => void,
    className?: string,
};

export default function BoxRadioList({ options, selected, onSelected, className }: PropsType) {
    return (
        <div className={`border border-[#f5f5f5] ${className ?? ""}`}>
            {options.map((option, i) => {
                return (
                    <button
                        key={`${option.key}_${option.key === selected ? "selected": "unselected"}`}
                        className={classnames(
                            "flex gap-2.5 items-center !px-4 !py-3 cursor-pointer w-full hover:bg-gray-100",
                            {
                                "border-b !border-[#f5f5f5]": i < options.length - 1
                            }
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            if (selected !== option.key) {
                                onSelected?.(option.key)
                            }
                        }}
                    >
                        <input
                            className="form-check-input form-check-input_fill !mt-0 cursor-pointer"
                            type="radio"
                            checked={option.key === selected}
                            onChange={() => {}}
                        />
                        <div className="flex-1 text-start">
                            <div className="flex">
                                <p
                                    className="form-check-label !block flex-1 text-start"
                                    dangerouslySetInnerHTML={{ __html: option.title }}
                                />
                                {!!option.subtitle && (<span dangerouslySetInnerHTML={{ __html: option.subtitle }} />)}
                            </div>
                            {!!option.description && <p dangerouslySetInnerHTML={{ __html: option.description }} className="text-xs text-gray-500 mt-1" />}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}