"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useFormState } from "react-dom";

import { updateAddress } from "./actions";
import { useNotifications } from "@/components/ui/Notifications";

import type { UpdateShippingPayload, Address } from "@/lib/wordpress/types/cart_type";

import Modal, { ModalHeader, ModalFooter } from "@/components/ui/Modal";
import Loading from "../ui/Loading";

import { classnames } from "@/utlis/classnames";
import { Addresses } from "@/lib/wordpress/types";

const InputAddress = ({
    label,
    name,
    placeholder,
    value,
    onChange,
    options = [],
}: {
    label: string,
    name: string,
    placeholder?: string,
    value: string | undefined,
    onChange: (value: string) => void,
    options?: any[],
}) => {
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState("");

    const toggleActive = useCallback(() => setActive(active => !active), []);

    if (options.length > 0) {
        const valueInput = options.find(o => o.value === value)?.label ?? (value ?? "");

        return (
            <div className="search-field my-3">
                <div
                    className={`form-label-fixed hover-container ${active ? "js-content_visible" : ""}`}
                >
                    <label htmlFor={name} className="form-label bg-white">
                        {label}
                    </label>
                    <div className="js-hover__open">
                        <input
                            id={name}
                            type="text"
                            className="form-control form-control-lg search-field__actor search-field__arrow-down"
                            value={valueInput}
                            readOnly
                            placeholder={placeholder}
                            onClick={toggleActive}
                        />
                    </div>

                    <div className="filters-container js-hidden-content mt-2 bg-white">
                        <div className="search-field__input-wrapper">
                            <input
                                type="text"
                                className="search-field__input form-control form-control-sm bg-lighter border-lighter"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <ul className="search-suggestion list-unstyled max-h-40 overflow-y-auto">
                            {options
                                .filter((option) =>
                                    option.value.toLowerCase().includes(search.toLowerCase()) ||
                                    option.label.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((elm) => (
                                    <li
                                        onClick={() => {
                                            if (elm.value !== value) {
                                                onChange(elm.value);
                                            }
                                            setActive(false);
                                        }}
                                        key={elm.value}
                                        className={
                                            classnames(
                                                "search-suggestion__item js-search-select",
                                                {
                                                    "text-red-600 font-medium hover:text-red-600": elm.value === value
                                                }
                                            )
                                        }
                                    >
                                        {elm.label}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div className="form-floating my-3">
            <input
                id={name}
                type="text"
                className="form-control"
                placeholder={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

interface ButtonModalPropsType {
    packageId: number;
    address: Address;
    optimisticUpdate: (payload: UpdateShippingPayload) => void;
    addresses: Addresses | undefined;
}

export default function ButtonModalAddress({ packageId, address, optimisticUpdate, addresses }: ButtonModalPropsType) {

    // const [state, dispatch] = useReducer(stateReducer, { data: address, isModal: false, searchCountry: "", searchState: "" })

    const [state, formAction] = useFormState(updateAddress, { message: undefined, cart: undefined });
    const { addSuccessNotification, addErrorNotification } = useNotifications();
    const [pending, setPending] = useState<boolean>(false);

    const [data, setData] = useState<Address>(address);
    const [isModal, setIsModal] = useState<boolean>(false);

    useEffect(() => {
        setData(address);
    }, [address]);

    useEffect(() => {
        if (state.cart || state.message) {
            setPending(false);
            setIsModal(false);
        }
        if (state.message) {
            addErrorNotification(state.message);
        }

        if (state.cart) {
            addSuccessNotification(`Update shipping successfully`);
        }

    }, [state, addErrorNotification, addSuccessNotification]);

    const countries = useMemo(() => {
        return Object.keys(addresses?.shipping_countries ?? {}).map((key) => {
            return {
                value: key,
                label: addresses?.shipping_countries?.[key] ?? ""
            };
        }) ?? [];
    }, [addresses?.shipping_countries]);
    const states = useMemo(() => {
        const objectStates = addresses?.shipping_country_states?.[data.country] ?? {};

        return Object.keys(objectStates).map((key) => {
            return {
                value: key,
                label: objectStates?.[key] ?? ""
            };
        });
    }, [data.country, addresses?.shipping_country_states]);

    const toggleIsModal = useCallback(() => {
        if (!pending) {
            setIsModal((isModal) => !isModal);
        }
    }, [pending]);

    const changeData = useCallback((key: string, value: string) => {
        if (key === "country") {

            const valueStates: string[] = Object.keys(addresses?.shipping_country_states?.[value] ?? {});
            setData({
                ...data,
                [key]: value,
                state: valueStates.length > 0 ? valueStates[0] : ""
            });
            return;
        }
        setData({
            ...data,
            [key]: value,
        });
    }, [data, addresses?.shipping_country_states]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!pending && JSON.stringify(data) !== JSON.stringify(address)) {
            setPending(true);
            const submit = formAction.bind(null, { packageId, address: data });
            optimisticUpdate({ packageId, address: data });
            await submit();
        }
    }

    return (
        <>
            <button
                className="text-xs"
                onClick={toggleIsModal}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
            >
                CHANGE ADDRESS
            </button>
            <Modal
                showModal={isModal}
                onClose={toggleIsModal}
                size="large"
            >
                <form onSubmit={onSubmit}>
                    <ModalHeader title="Update address" onClose={toggleIsModal} />
                    <div className="relative flex-1 px-10 py-7">
                        <div className="col-md-12">
                            <InputAddress
                                label="Country / Region"
                                name="Country"
                                placeholder="Choose a location..."
                                value={data.country}
                                onChange={(value) => changeData("country", value)}
                                options={countries}
                            />

                        </div>
                        <div className="col-md-12">
                            <InputAddress
                                label="State"
                                name="state"
                                placeholder="Choose a state..."
                                value={data.state}
                                onChange={(value) => changeData("state", value)}
                                options={states}
                            />

                        </div>
                        <div className="col-md-12">
                            <InputAddress
                                label="City"
                                name="city"
                                value={data.city}
                                onChange={(value) => changeData("city", value)}
                            />

                        </div>
                        <div className="col-md-12">
                            <InputAddress
                                label="Postcode/ZIP"
                                name="city"
                                value={data.postcode}
                                onChange={(value) => changeData("postcode", value)}
                            />

                        </div>
                    </div>
                    <ModalFooter>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={toggleIsModal}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {pending ? <Loading className="spinner-border-sm text-white" /> : "Save changes"}
                        </button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}