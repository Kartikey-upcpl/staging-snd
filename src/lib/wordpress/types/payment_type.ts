export type Payment = {
    id: string;
    title: string;
    description: string;
    order: number;
    enabled: boolean;
    method_title: string;
    method_description: string;
    method_supports: string[];
    settings: object;
};

export type PaymentPublic = Omit<Payment, 'settings'>;