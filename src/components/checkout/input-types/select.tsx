import React, { useCallback, useEffect, useRef, useState } from "react";

import { FieldAddress } from "@/lib/wordpress/types";
import { classnames } from "@/utlis/classnames";

export type SelectType = {
    value: string,
    label: string,
}

const getNameOption = (value: string, options: SelectType[]) => {
    return options.find(o => o.value === value)?.label ?? "";
}

const getValueOption = (label: string, options: SelectType[]) => {
    return options.find(o => o.label === label)?.value ?? "";
}

export function Select({
    field,
    initValue,
    keyInput,
    onChanged,
    options,
    onValidate,
}: {
    field: FieldAddress,
    initValue: string,
    keyInput: string,
    onChanged: (value: string) => void,
    options: SelectType[]
    onValidate?: (value: string) => string[];
}) {
    const ref = useRef<HTMLInputElement>(null)
    const [isFilter, setIsFilter] = useState(false);
    const [search, setSearch] = useState("");

    const [name, setName] = useState(getNameOption(initValue, options));
    const [showMessage, setShowMessage] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        if (getNameOption(initValue, options) !== name) {
            openShowMessage();
            setName(getNameOption(initValue, options));
        }
    }, [initValue]);

    useEffect(() => {
        if (!isFilter && search !== "") {
            setSearch("");
        }
    }, [isFilter]);

    useEffect(() => {
        if (showMessage && !!onValidate) {
            setMessages(onValidate(getValueOption(name, options)));
        }
    }, [name]);

    const toggleFilter = useCallback(() => setIsFilter(isFilter => !isFilter), []);

    const openShowMessage = useCallback(() => {
        if (!showMessage) {
            setShowMessage(true);
        }
    }, [showMessage]);

    return (
        <div className="search-field mb-4">
            <div
                className={classnames(
                    "form-label-fixed hover-container",
                    {
                        "js-content_visible": isFilter,
                    }
                )}
            >
                <label htmlFor={keyInput} className="form-label" style={{ backgroundColor: "white" }}>
                    {field.label}{field.required ? (
                        <>
                            {" "}<b className='text-pink-600'>*</b>
                        </>
                    ) : undefined}
                </label>
                <div className="js-hover__open">
                    <input
                        ref={ref}
                        type="text"
                        className={classnames(
                            "form-control form-control-lg search-field__actor search-field__arrow-down",
                            {
                                "is-invalid": messages.length > 0
                            }
                        )}
                        id={keyInput}
                        value={name}
                        readOnly
                        placeholder="Choose a option..."
                        onClick={toggleFilter}
                    />
                </div>
                <div className={"filters-containermt-2 js-hidden-content mt-2 p-2 bg-white max-h-48 overflow-y-auto"}>
                    <div className="search-field__input-wrapper">
                        <input
                            type="text"
                            className="search-field__input form-control form-control-sm bg-lighter border-lighter"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <ul className="search-suggestion list-unstyled">
                        {options
                            .filter((elm) =>
                                elm.value.toLowerCase().includes(search.toLowerCase()) ||
                                elm.label.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((option, i) => (
                                <li
                                    onClick={() => {
                                        if (name !== option.label) {
                                            setName(option.label);
                                        }
                                        if (initValue !== option.value) {
                                            onChanged(option.value);
                                        }
                                        openShowMessage();
                                        setIsFilter(false);
                                    }}
                                    key={i}
                                    className={classnames(
                                        "search-suggestion__item js-search-select",
                                        {
                                            "font-medium text-pink-600": getValueOption(name, options) === option.value
                                        }
                                    )}
                                >
                                    {option.label}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {messages?.map((message, index) => (
                <p key={index} className="text-red-500 mt-1.5 text-xs">{message}</p>
            ))}
        </div>
    )
}