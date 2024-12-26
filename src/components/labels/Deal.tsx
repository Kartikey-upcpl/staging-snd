import { convertPriceHtml } from "@/utlis/price";
import { deals } from "@/utlis/product";

const style = `
    .woocommerce_deal_price > span > bdi {
        font-size:20px !important;
    }
`

interface Props {
    deal?: {
        deal_price: number;
        deal_price_tag: string;
        image_url: string;
    },
    currencyCode: string,
    currencySymbol: string,
    productData?: {
        regular_price: string;
        type: string;
    } | null;
}

export default function Deal(props: Props) {
    if (!props.deal || !props.deal.deal_price) return null;
    if (!props.productData || props.productData.type !== "simple") return null;

    const dealInfo = deals?.find(d => d.key === props.deal?.deal_price_tag) ?? deals[0];

    // Parse MRP and calculate savings only if the product type is "simple"
    const mrp = parseFloat(props.productData.regular_price);
    const dealPrice = props.deal.deal_price;
    if (isNaN(mrp) || isNaN(dealPrice)) {
        console.error("Invalid price values.");
        return null; // Return null if prices are not valid numbers
    }
    const savings = mrp - dealPrice;
    const savingsPercentage = ((savings / mrp) * 100).toFixed(0); // Convert to whole number percentage
    const priceHtml: string = convertPriceHtml(dealPrice, props.currencyCode, props.currencySymbol);
    const savingsHtml: string = convertPriceHtml(savings, props.currencyCode, props.currencySymbol);

    return (
        <div className="product-summary">
            <div className="woocommerce_deal_price">
                <style dangerouslySetInnerHTML={{ __html: style }} />
                <h3
                    className="deal_price_tag"
                    style={{
                        fontSize: "13px",
                        lineHeight: "20px",
                        width: "max-content",
                        padding: "2px 10px",
                        borderRadius: "2px",
                        color: dealInfo.color,
                        border: 0,
                        height: "auto !important",
                        margin: "0 !important",
                        backgroundColor: dealInfo.background,
                    }}
                >
                    {dealInfo.name}
                </h3>
                Deal Price: <span className="woocommerce-Price-amount amount" dangerouslySetInnerHTML={{ __html: priceHtml }} />
                <div>
                    You Save: <span className="woocommerce-Price-amount amount" dangerouslySetInnerHTML={{ __html: savingsHtml }} /> ({savingsPercentage}%)
                </div>
                <div>Inclusive of all taxes</div>
            </div>
        </div>
    );
}