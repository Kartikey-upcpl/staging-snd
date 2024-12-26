export type Billing_Address = {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    company?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    email?: string;
    phone?: string;
  };

  export type Shipping_Address = Omit<Billing_Address, 'email' | 'phone'>;

  export type UpdateCustomerAddressPayload = {
    billing_address?: Billing_Address;
    shipping_address?: Shipping_Address;
  }