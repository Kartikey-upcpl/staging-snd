export type Addresses = {
    country: string;
    billing: {[key: string]: FieldAddress};
    shipping: {[key: string]: FieldAddress};
    address_format: {[key: string]: string};
    billing_countries_selected: string;
    billing_countries: {[country_code: string]: string};
    billing_countries_states: {[country_code: string]: {[state_code: string]: string}};
    shipping_countries_selected: string;
    shipping_countries: {[country_code: string]: string};
    shipping_country_states: {[country_code: string]: {[state_code: string]: string}};
    additional: {[key: string]: FieldAddress};
};

export type CustomAttributeAddress = {
    "data-conditional-parent"?: string
    "data-conditional-parent-value"?: string
}

export type ParentAddress = {
    name: string
}

export type FieldAddress = {
    label: string,
    placeholder?: string,
    required: boolean,
    type?: string,
    label_class: string[],
    class: string[],
    validate: string[],
    autocomplete: string,
    priority: number,
    country_field?: string,
    country?: string,
    position?: string,
    default?: string,
    custom_attributes?: CustomAttributeAddress,
    name?: string,
    parent?: ParentAddress
}