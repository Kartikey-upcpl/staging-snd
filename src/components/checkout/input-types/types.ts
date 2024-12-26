import { FieldAddress } from "@/lib/wordpress/types";

export type InputProps<T> = {
    field: FieldAddress;
    name: string;
    value: T | undefined;
    onChanged: (value: T) => void;
    meta: {
        key: string;
        country: string;
        address_format: { [key: string]: string };
        countries_selected: string;
        countries: { [key: string]: string };
        countries_states: { [key: string]: { [key: string]: string } };
        country_selected: string | undefined;
    }
}

export function getType(type: string | undefined): Type {
    if (!type) return 'text';
    if (['text', 'textarea', 'password', 'email', 'tel', 'country', 'state'].includes(type)) return type as Type;
    return 'text';
}

export type Type = 'text' | 'textarea' | 'password' | 'email' | 'tel' | 'country' | 'state';
export type InputType = React.FC<InputProps<string>>;