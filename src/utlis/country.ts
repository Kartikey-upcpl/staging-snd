export const countries= [
    {
        value: 'IN',
        label: 'India'
    },
];

export type Country = {
    [key: string]: {
        value: string,
        label: string
    }[]
};

export const countryStates: Country = {
    "IN": [
        {
            value: 'AP',
            label: 'Andhra Pradesh',
        },
        {
            value: 'AR',
            label: 'Arunachal Pradesh',
        },
        {
            value: 'AS',
            label: 'Assam',
        },
        {
            value: 'BR',
            label: 'Bihar',
        },
        {
            value: 'CT',
            label: 'Chhattisgarh',
        },
        {
            value: 'GA',
            label: 'Goa',
        },
        {
            value: 'GJ',
            label: 'Gujarat',
        },
        {
            value: 'HR',
            label: 'Haryana',
        },
        {
            value: 'HP',
            label: 'Himachal Pradesh',
        },
        {
            value: 'JK',
            label: 'Jammu and Kashmir',
        },
        {
            value: 'JH',
            label: 'Jharkhand',
        },
        {
            value: 'KA',
            label: 'Karnataka',
        },
        {
            value: 'KL',
            label: 'Kerala',
        },
        {
            value: 'LA',
            label: 'Ladakh',
        },
        {
            value: 'MP',
            label: 'Madhya Pradesh',
        },
        {
            value: 'MH',
            label: 'Maharashtra',
        },
        {
            value: 'MN',
            label: 'Manipur',
        },
        {
            value: 'ML',
            label: 'Meghalaya',
        },
        {
            value: 'MZ',
            label: 'Mizoram',
        },
        {
            value: 'NL',
            label: 'Nagaland',
        },
        {
            value: 'OR',
            label: 'Odisha',
        },
        {
            value: 'PB',
            label: 'Punjab',
        },
        {
            value: 'RJ',
            label: 'Rajasthan',
        },
        {
            value: 'SK',
            label: 'Sikkim',
        },
        {
            value: 'TN',
            label: 'Tamil Nadu',
        },
        {
            value: 'TS',
            label: 'Telangana',
        },
        {
            value: 'TR',
            label: 'Tripura',
        },
        {
            value: 'UK',
            label: 'Uttarakhand',
        },
        {
            value: 'UP',
            label: 'Uttar Pradesh',
        },
        {
            value: 'WB',
            label: 'West Bengal',
        },
        {
            value: 'AN',
            label: 'Andaman and Nicobar Islands',
        },
        {
            value: 'CH',
            label: 'Chandigarh',
        },
        {
            value: 'DN',
            label: 'Dadra and Nagar Haveli',
        },
        {
            value: 'DD',
            label: 'Daman and Diu',
        },
        {
            value: 'DL',
            label: 'Delhi',
        },
        {
            value: 'LD',
            label: 'Lakshadeep',
        },
        {
            value: 'PY',
            label: 'Pondicherry (Puducherry)',
        },
    ]
}