import { Addresses, OrderReceivedAddress } from "@/lib/wordpress/types";

const pattern = /\{(\{?)(.*?)(?:(\/)\}|\}(?:)?)/g;

// export const convertAddress = ({ address, addresses, type = "billing" }: { address: OrderReceivedAddress, addresses: Addresses | undefined, type?: string }) : string=> {
export const convertAddress = (address: OrderReceivedAddress, addresses: Addresses | undefined, type: string) : string => {
    const formatContent: string = addresses?.address_format?.[address.country] ?? addresses?.address_format?.default ?? "{name}\n{company}\n{address_1}\n{address_2}\n{city}\n{state}\n{postcode}\n{country}";
    
    const nameCountry: string | undefined = type === "shipping" ? addresses?.billing_countries?.[address.country] : addresses?.shipping_countries?.[address.country];

    const states: { [key: string]: string } | undefined = type === "shipping" ? addresses?.shipping_country_states?.[address.country] : addresses?.billing_countries_states?.[address.country];
    const nameState = states?.[address.state] ?? address.state;
    
    const newAddress: {[key: string]: string} = {
        ...address,
        name: `${address.first_name} ${address.last_name}`.trim(),
        ...(!!nameCountry && {country: nameCountry}),
        state: nameState,
    }

    const matches: any[] = Array.from(formatContent.matchAll(pattern));

    if (matches.length < 1) {
        return formatContent;
    }

    let text = formatContent;
    for (var i = 0; i < matches.length; i++) {
        if (!!matches[i]?.[0]) {
            
            const textReplace = matches[i]?.[0];
            const key = matches[i]?.[2];
            text = text.replace(textReplace, newAddress?.[key] ?? "");
        }
    }
    return text.replace(/\n\n/g, "\n");
}