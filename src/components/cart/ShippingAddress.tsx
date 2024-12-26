import { Address, Addresses } from "@/lib/wordpress/types";

const getAddress = (destination: Address, addresses: Addresses | undefined) => {

    let data: string[] = [];

    const country: string = destination.country;
    const state: string = destination.state;
    const city: string = destination.city;
    const postcode = destination.postcode;

    if (!!city) {
        data = [...data, city];
    }

    const states: { [key: string]: string } = addresses?.shipping_country_states[country] ?? {};

    const nameState: string = states?.[state] ?? state;

    if (!!nameState) {
        data = [...data, nameState];
    }

    const nameCountry: string = addresses?.shipping_countries?.[country] ?? country;

    if (!!nameCountry) {
        data = [...data, nameCountry];
    }

    if (!!postcode) {
        data = [...data, postcode];
    }

    return data.join(", ");
}

export default function ShippingAddress({
    address,
    addresses,
}: {
    address: Address,
    addresses: Addresses | undefined,
}) {

    return <div className="text-gray-700">Shipping to <span className="font-semibold">{getAddress(address, addresses)}.</span></div>;
}