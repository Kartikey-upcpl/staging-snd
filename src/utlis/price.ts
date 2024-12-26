export function convertToStringPrice(price: string, unit: number, currency: string) {

    var valuePrice = !isNaN(Number(price)) ? Number(price): 0;

    valuePrice = unit > 1 ? valuePrice / Math.pow(10, unit): valuePrice;

    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(valuePrice);;
}

export function convertPriceHtml(price: number, currencyCode: string, currencySymbol: string,) {
    const priceText = convertToStringPrice(price.toString(), 0, currencyCode);
    return `<bdi>${priceText.replace(currencySymbol, `<span class="woocommerce-Price-currencySymbol">${currencySymbol}</span>`)}</bdi>`;
}