"use client";
import { useState, useCallback, useEffect } from 'react';
import { goKwikCheckoutOrderAction } from '../../actions';
import { uuid } from '@/utlis/strings';
import { getOrderById } from '../../actions';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';

interface GoKWikCheckoutProps {
    userId: string | undefined;
}

interface GoKwikCredentials {
    merchant_id: string;
    app_id: string;
    app_secret: string;
    api_url: string;
    env_type: string;
}

const GoKWikCheckout: React.FC<GoKWikCheckoutProps> = ({ userId }) => {
    const [gokwikCredentials, setGokwikCredentials] = useState<GoKwikCredentials | null>(null);
    const [isSdkLoaded, setIsSdkLoaded] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    // Fetch GoKwik credentials on component mount
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const checkoutData = await goKwikCheckoutOrderAction();
                setGokwikCredentials(checkoutData);
            } catch (error) {
                console.error("Failed to fetch GoKwik credentials:", error);
            }
        };
        fetchCredentials();
    }, []);
    // Load the SDK script only on click
    const loadGoKwikSdk = async () => {
        if (isSdkLoaded) return Promise.resolve(); // SDK is already loaded

        return new Promise<void>((resolve, reject) => {
            if (!gokwikCredentials?.api_url) {
                reject(new Error("GoKwik API URL is missing"));
                return;
            }

            const existingScript = document.querySelector(`script[src="${gokwikCredentials.api_url}"]`);
            if (existingScript) {
                setIsSdkLoaded(true); // SDK is already in the DOM
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = gokwikCredentials.api_url;
            script.async = true;
            script.onload = () => {
                setIsSdkLoaded(true);
                resolve();
            };
            script.onerror = () => reject(new Error("Failed to load GoKwik SDK"));
            document.head.appendChild(script);
        });
    };

    const handleCheckout = useCallback(async () => {
        try {
            setLoading(true); // Set loading to true
            await loadGoKwikSdk(); // Ensure SDK is loaded before initiating checkout
            if (window.gokwikSdk && gokwikCredentials) {
                const requestId = uuid();
                window.gokwikSdk.initCheckout({
                    environment: gokwikCredentials.env_type,
                    type: 'merchantInfo',
                    mid: gokwikCredentials.merchant_id,
                    merchantParams: {
                        merchantCheckoutId: userId,
                    },
                    requestId,
                });
            } else {
                throw new Error("GoKwik SDK not available after loading");
            }
        } catch (error: any) {
            console.error(error.message);
            alert('Failed to load GoKwik SDK. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [gokwikCredentials, userId]);

    useEffect(() => {
        const initializeSdkListeners = () => {
            const sdk = window.gokwikSdk as any;
            if (sdk && typeof sdk.on === 'function') {
                // Listen for 'order-complete' event
                sdk.on('order-complete', async (order: any) => {
                    console.log('Order completed:', order);
                    const { merchant_order_id } = order;
                    const orderDetails = await getOrderById(merchant_order_id);
                    const { order_key } = orderDetails;
                    console.log('Order completed:', merchant_order_id, order_key);

                    sdk.close();
                    router.replace(`/checkout/order-received/${merchant_order_id}/?key=${order_key}`);
                });

                // Listen for 'payment-failure' event
                sdk.on('payment-failure', (failureDetails: any) => {
                    console.error('Payment failed:', failureDetails);
                    alert('Payment failed. Please try again.');
                });
            } else {
                console.warn('GoKwik SDK does not have `on` method for events or is not loaded yet');
            }
        };

        if (window.gokwikSdk) {
            initializeSdkListeners();
        } else {
            const interval = setInterval(() => {
                if (window.gokwikSdk) {
                    clearInterval(interval);
                    initializeSdkListeners();
                }
            }, 500); // Check every 500ms until SDK is ready
        }

        return () => {
            const sdk = window.gokwikSdk as any;
            if (sdk && typeof sdk.off === 'function') {
                sdk.off('order-complete');
                sdk.off('payment-failure');
            }
        };
    }, []);


    return (
        <>
            <div onClick={handleCheckout}
                className="text-center">
                <button
                    className='checkout-button flex justify-center items-center'
                    disabled={loading} // Disable button when loading
                >
                    {loading ? <Loading className="spinner-border-sm text-white" /> : "GOKWIK CHECKOUT"} {/* Show loading text */}
                    <img className="ml-2" src="https://cdn.gokwik.co/v4/images/upi-icons.svg"></img>
                </button>
            </div>
        </>
    );
};

export default GoKWikCheckout;
