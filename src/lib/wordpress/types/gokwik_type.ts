interface GokwikCheckoutParams {
    environment: string;
    type: string;
    mid: string;
    phoneNumber?: string;
    bannerMessages?: string[];
    merchantParams: {
      merchantCheckoutId: string |undefined;
      customerToken?: string;
    };
    requestId?: string; // Add requestId to the type definition
  }
  
  interface Window {
    gokwikSdk: {
        initCheckout: (params: GokwikCheckoutParams) => void;
    };
    Intercom?: (...args: any[]) => void;
}
