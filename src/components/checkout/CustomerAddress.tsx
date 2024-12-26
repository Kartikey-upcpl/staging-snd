'use client';

import React, { useCallback, useEffect } from "react";
import { useFormState } from "react-dom";
import get from "lodash/get";
import { updateCustomerAction } from "./actions";

import type { Addresses, Cart, FieldAddress, UpdateCustomerAddressPayload } from "@/lib/wordpress/types";
import { isApiError, type ApiError, type ApiResponse, } from "@/lib/type-guards";
import inputTypes, { getType, type InputType } from './input-types';
import BoxViewInput from "./input-types/BoxViewInput";

interface CheckoutFormProps {
    addresss: Addresses | ApiError;
    shipToDifferentAddress: boolean;
    setShipToDifferentAddress: (value: boolean) => void;
    formState: UpdateCustomerAddressPayload;
    updateCustomerState: (payload: UpdateCustomerAddressPayload) => void;
}

/**
 * Customer address component.
 * 
 * @param {CheckoutFormProps} props The props
 * @returns {JSX.Element} The customer address component
 */
export default function CustomerAddress(props: CheckoutFormProps) {
    const { addresss, shipToDifferentAddress, updateCustomerState, formState, setShipToDifferentAddress } = props;
    const [state, formAction] = useFormState<ApiResponse<Cart>, UpdateCustomerAddressPayload>(updateCustomerAction, {});

    // Update server
    const updateCustomerServer = useCallback(async (payload: UpdateCustomerAddressPayload) => {
        const submit = formAction.bind(null, payload);
        await submit();
    }, [formAction]);

    const getFormField = (
        key: string,
        field: FieldAddress,
        preField: FieldAddress | undefined,
        nextField: FieldAddress | undefined,
        addressType: 'billing' | 'shipping',
    ) => {
        if (isApiError(addresss)) {
            return (
                <p className="text-red-500">
                    {addresss.message}
                </p>
            );
        }

        const Input: InputType = inputTypes[getType(field?.type)] || inputTypes.text;
        // Address name billing_city => city
        const addressName = key.replace(`${addressType}_`, '');
        return (
            <BoxViewInput
                key={key}
                field={field}
                preField={preField}
                nextField={nextField}
            >
                <Input
                    onChanged={(value) => {
                        const payloadValue = {
                            [addressName]: value,
                            ...(addressName === 'country' && value !== get(formState, `${addressType}_address.country`, '') && { state: '', postcode: '' }) // Reset state and postcode if 
                        };
                        if (!shipToDifferentAddress) {
                            const payload = {
                                billing_address: payloadValue,
                                shipping_address: payloadValue
                            }
                            updateCustomerState(payload);
                            updateCustomerServer(payload);
                        } else {
                            const payload = {
                                [addressType + '_address']: payloadValue
                            };
                            updateCustomerState(payload);
                            updateCustomerServer(payload);
                        }
                    }}
                    value={get(formState, `${addressType}_address.${addressName}`, '')}
                    field={field}
                    name={key}
                    meta={{
                        key,
                        country: addresss.country,
                        address_format: addresss.address_format,
                        countries_selected: get(addresss, `${addressType}_countries_selected`, ''),
                        countries: get(addresss, `${addressType}_countries`, {}),
                        countries_states: get(addresss, `${addressType}_countries_states`, {}),
                        country_selected: get(formState, `${addressType}_address.country`, '')
                    }}
                />
            </BoxViewInput>
        );
    }

    if (isApiError(addresss)) {
        return (
            <p className="text-red-500">
                {addresss.message}
            </p>
        );
    }

    return (
        <>
            {addresss?.billing && (
                <div className="row">
                    {Object.keys(addresss.billing).map((key, i) =>
                    getFormField(
                        key,
                        addresss.billing[key],
                        addresss.billing[Object.keys(addresss.billing)?.[i - 1]],
                        addresss.billing[Object.keys(addresss.billing)?.[i + 1]],
                        'billing',
                    ))}
                </div>
            )}
            <div className="form-check">
                <input
                    className="form-check-input form-check-input_fill"
                    type="checkbox"
                    checked={shipToDifferentAddress}
                    onChange={(e) => setShipToDifferentAddress(e.target.checked)}
                    name="ship_different_address"
                />
                <label
                    className="form-check-label mt-0.5"
                    htmlFor="ship_different_address"
                >
                    SHIP TO A DIFFERENT ADDRESS?
                </label>
            </div>
            {addresss?.shipping && shipToDifferentAddress && (
                <div className="row">
                    {Object.keys(addresss.shipping).map((key, i) =>
                        getFormField(
                            key,
                            addresss.shipping[key],
                            addresss.shipping[Object.keys(addresss.shipping)?.[i - 1]],
                            addresss.shipping[Object.keys(addresss.shipping)?.[i + 1]],
                            'shipping',
                        )
                    )}
                </div>
            )}
        </>
    );
}
