export const optionsPayment: {[key: string]: {[key: string]: any}} = {
    "razorpay": {
        'payment_method': 'razorpay',
        'prepaid-discount': 'yes'
    },
    "cod": {
        'payment_method': 'razorpay',
        'smart-cod-pro': 'yes'
    }
}