import type { Metadata } from "next";
import { Inter, Solway } from "next/font/google";
// import "./globals.css";

// ============================== GLOBAL STYLES ==============================
import "react-tooltip/dist/react-tooltip.css";
import "../../public/assets/css/plugins/swiper.min.css";
import "../../public/assets/sass/style.scss";
import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";
import "./globals.css";

// ============================== instantsearch ==============================
// import 'instantsearch.css/themes/reset.css';
// import 'instantsearch.css/themes/algolia.css';
// import 'instantsearch.css/themes/satellite.css';
import '@/themes/custom.scss';

// ============================== SCSS ==============================
import "@/scss/shimmer.scss";

// ============================== COMPONENTS ==============================
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Svgs from "@/components/uomo/common/Svgs";
import { Notifications } from "@/components/ui/Notifications";
import BottomBar from "@/components/bottombar/bottombar";
import WhatsAppIcon from "@/components/ui/Whatsappicon";

// ============================== Providers ==============================
import { CartProvider } from "@/components/cart/cart-context";
import { getCart, currentUser } from "@/lib/wordpress";
import Settings from "@/components/app/Settings";
import { cookies } from "next/headers";
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from "@/lib/constants";
import GoogleProvider from "@/components/account/GoogleOAuthProvider";


// ============================== Apis ==============================

const inter = Inter({ subsets: ["latin"] });
const solway = Solway({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "800"], // Specify the available weights
});
export const metadata: Metadata = {
    title: WEBSITE_TITLE,
    description: WEBSITE_DESCRIPTION,
};

const flasomeStyle = `@font-face {
    font-family: "fl-icons";
    font-display: block;
    src: url(/assets/css/icons/fl-icons.eot?v=3.19.6);
    src:
        url(/assets/css/icons/fl-icons.eot#iefix?v=3.19.6) format("embedded-opentype"),
        url(/assets/css/icons/fl-icons.woff2?v=3.19.6) format("woff2"),
        url(/assets/css/icons/fl-icons.ttf?v=3.19.6) format("truetype"),
        url(/assets/css/icons/fl-icons.woff?v=3.19.6) format("woff"),
        url(/assets/css/icons/fl-icons.svg?v=3.19.6#fl-icons) format("svg");
}`;
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cart = getCart();
    const token = cookies().get("User-Token")?.value;
    const user = currentUser(token);
    return (
        <html
            lang="en"
        >
            <head>
                <style id="flatsome-main-inline-css" type="text/css" dangerouslySetInnerHTML={{ __html: flasomeStyle }} />
            </head>
            <body className={`${inter.className} ${solway.className}`}>
                <GoogleProvider>
                    <Notifications>
                        <CartProvider cartPromise={cart} userPromise={user}>
                            <Svgs />
                            <div className="theme-22">
                                <Header />
                                <div className="sm:container-fit max-w-full overflow-hidden">
                                    {children}
                                </div>
                                <WhatsAppIcon />
                                <Footer />
                                <BottomBar />
                            </div>
                        </CartProvider>
                    </Notifications>
                </GoogleProvider>
                <Settings />
            </body>
        </html>
    );
}
