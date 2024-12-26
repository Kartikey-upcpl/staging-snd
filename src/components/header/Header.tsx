import { Suspense } from "react";
import Link from "next/link";
// import CartLength from "./components/CartLength";
// import Nav from "./components/Nav";
import CartModal from "@/components/cart/CartModal";
import Image from '@/components/image/Image';
import Search, { SearchSkeleton } from './Search';
import Nav from './Nav';
import { getCategories } from "@/lib/wordpress";
import MenuModal from "./MenuModal";

interface Props { }

export default async function Header(props: Props) {
    const categories = getCategories({});
    return (
        <>
            <header id="header" className="header  sticky_disabled w-100 bg-white">
                {/* <div className="header-top bordered">
                            <div className="container d-flex align-items-center">
                            <ul className="list-unstyled d-flex flex-1 gap-3 m-0">
                        <li>
                            <Link href="/about-us" className="menu-link menu-link_us-s fs-13 text-white">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacts" className="menu-link menu-link_us-s fs-13 text-white">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/track-order" className="menu-link menu-link_us-s fs-13 text-white">
                                Track Order
                            </Link>
                        </li>
                    </ul>
                    <div className="heeader-top__right flex-1 d-flex gap-1 justify-content-end">
                        <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
                            {socialLinks.map((link, index) => (
                                <li key={index} className="flex flex-col justify-center">
                                    <a href={link.href} className="footer__social-link d-block">
                                        <svg
                                            className={link.className}
                                            width={link.width}
                                            height={link.height}
                                            viewBox={link.viewBox}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <use href={link.icon} />
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> */}
                <div className="header-desk_type_6 style2">
                    <div className="header-middle">
                        <div className="container-fit flex align-items-center">
                            <div className="">
                                <Link href="/">
                                    <Image
                                        src="/assets/staranddaisy/logo.png"
                                        width={143}
                                        height={54}
                                        alt="Logo"
                                        className="logo__image"
                                    />
                                </Link>
                            </div>
                            {/* <!-- /.logo --> */}
                            <Suspense fallback={<SearchSkeleton />}>
                                <Search />
                            </Suspense>
                            {/* <!-- /.header-search --> */}
                            <div className="flex align-items-center  ">
                                {/* Wishlist Icon */}
                                <Link className="" href="/wishlist" style={{ textDecoration: 'none' }}>
                                    <svg
                                        className="w-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="black"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </Link>
                                <div className="text-2xl text-gray-300 ">|</div>
                                {/* Track Order */}
                                <Link className="text-black" href="/track-order" >
                                    <div className="flex">
                                        <p className="text-sm">TRACK ORDER</p>
                                        <span className="ml-2"><svg className="w-full"
                                            width="20" height="20" viewBox="0 0 1024 1024" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M359.876 719.926c-96.136 0-186.524-37.446-254.51-105.432-140.33-140.33-140.33-368.69 0-509.02C173.354 37.488 263.742 0.042 359.876 0.042c96.136 0 186.526 37.446 254.51 105.432 68.002 67.986 105.448 158.374 105.448 254.51 0.016 96.136-37.43 186.524-105.416 254.51-68 67.986-158.388 105.432-254.542 105.432z m0-703.886c-91.872 0-178.244 35.79-243.2 100.746-134.098 134.096-134.098 352.302 0 486.398 64.956 64.956 151.328 100.746 243.2 100.746 91.872 0 178.26-35.792 243.232-100.746 64.954-64.97 100.744-151.328 100.728-243.2 0-91.872-35.792-178.244-100.76-243.2-64.954-64.954-151.326-100.744-243.2-100.744z" fill="" /><path d="M359.876 687.9c-87.59 0-169.95-34.102-231.888-96.026C66.064 529.95 31.96 447.608 31.96 360c0.016-87.608 34.12-169.95 96.06-231.874 61.924-61.942 144.282-96.058 231.888-96.058 87.592 0 169.934 34.102 231.86 96.028 127.832 127.864 127.832 335.898 0.032 463.78-61.958 61.922-144.316 96.024-231.924 96.024z m0.032-639.836c-83.342 0-161.668 32.448-220.578 91.372C80.42 198.346 47.974 276.674 47.958 360c0 83.326 32.43 161.654 91.34 220.562 58.91 58.894 137.252 91.342 220.578 91.342 83.328 0 161.686-32.448 220.612-91.342 121.568-121.63 121.552-319.542-0.032-441.158-58.894-58.892-137.22-91.34-220.548-91.34z" fill="" /><path d="M103.93 368.014c-4.42 0-8-3.578-8-7.998 0-145.532 118.414-263.946 263.946-263.946 4.422 0 8 3.578 8 7.998a7.994 7.994 0 0 1-8 7.998c-136.72 0-247.948 111.228-247.948 247.95a7.994 7.994 0 0 1-7.998 7.998zM670.344 734.968a7.972 7.972 0 0 1-5.654-2.344L591.8 659.734a7.996 7.996 0 1 1 11.31-11.308L676 721.316a7.994 7.994 0 0 1-5.656 13.652zM726.894 678.45a7.972 7.972 0 0 1-5.654-2.344l-72.89-72.922a7.996 7.996 0 1 1 11.31-11.308l72.89 72.922a7.994 7.994 0 0 1-5.656 13.652z" fill="" /><path d="M659.036 746.31a7.996 7.996 0 0 1-5.656-13.654l79.172-79.17a7.996 7.996 0 1 1 11.308 11.31l-79.17 79.17a7.97 7.97 0 0 1-5.654 2.344z" fill="" /><path d="M998.402 927.32a7.976 7.976 0 0 1-5.656-2.344l-260.196-260.18a7.996 7.996 0 1 1 11.308-11.31l260.198 260.18a7.996 7.996 0 0 1-5.654 13.654zM920.292 1007.522a7.974 7.974 0 0 1-5.656-2.342L653.378 743.966a7.996 7.996 0 1 1 11.31-11.31l261.258 261.212a7.996 7.996 0 0 1-5.654 13.654z" fill="" /><path d="M959.91 1023.958c-17.106 0-33.182-6.672-45.274-18.778a7.996 7.996 0 1 1 11.31-11.31c9.076 9.092 21.136 14.09 33.962 14.09h0.032c12.808-0.016 24.822-4.998 33.852-14.058 9.092-9.076 14.09-21.122 14.09-33.932 0-12.824-4.998-24.884-14.074-33.96a7.996 7.996 0 1 1 11.31-11.31c12.108 12.108 18.762 28.182 18.762 45.272s-6.654 33.15-18.762 45.242c-12.044 12.074-28.088 18.73-45.178 18.746l-0.03-0.002z" fill="" /><path d="M976.844 950.97a7.974 7.974 0 0 1-5.656-2.342L732.55 710.006a7.996 7.996 0 1 1 11.308-11.31L982.496 937.32a7.996 7.996 0 0 1-5.652 13.65zM519.844 368.108H199.91a7.994 7.994 0 0 1-7.998-7.998v-31.994c0-4.42 3.578-8 7.998-8h319.934c4.422 0 8 3.578 8 8v31.994a7.994 7.994 0 0 1-8 7.998z m-311.934-15.996h303.936v-15.998H207.91v15.998z" fill="" /><path d="M247.884 528.074a7.992 7.992 0 0 1-7.826-6.436l-31.994-159.966a7.976 7.976 0 0 1 6.28-9.404c4.154-0.876 8.53 1.922 9.404 6.28l31.992 159.966a7.976 7.976 0 0 1-6.28 9.404 7.524 7.524 0 0 1-1.576 0.156z" fill="" /><path d="M471.854 528.074H247.9c-4.42 0-7.998-3.578-7.998-7.998s3.578-7.998 7.998-7.998h223.954c4.42 0 7.998 3.578 7.998 7.998s-3.576 7.998-7.998 7.998z" fill="" /><path d="M471.87 528.074c-0.532 0-1.062-0.046-1.578-0.156a7.978 7.978 0 0 1-6.28-9.404l31.994-159.966c0.876-4.358 5.232-7.138 9.404-6.28a7.978 7.978 0 0 1 6.28 9.404l-31.994 159.966a7.99 7.99 0 0 1-7.826 6.436zM359.876 480.084a7.994 7.994 0 0 1-7.998-7.998V408.1a7.994 7.994 0 0 1 7.998-7.998c4.422 0 8 3.578 8 7.998v63.986a7.994 7.994 0 0 1-8 7.998zM407.868 480.084a7.994 7.994 0 0 1-7.998-7.998V408.1a7.994 7.994 0 0 1 7.998-7.998 7.994 7.994 0 0 1 7.998 7.998v63.986a7.992 7.992 0 0 1-7.998 7.998zM311.888 480.084c-4.42 0-8-3.576-8-7.998V408.1c0-4.42 3.578-7.998 8-7.998s7.998 3.578 7.998 7.998v63.986a7.994 7.994 0 0 1-7.998 7.998zM263.898 336.114a7.996 7.996 0 0 1-5.656-13.652l79.984-79.984a7.996 7.996 0 1 1 11.31 11.31l-79.984 79.984a7.97 7.97 0 0 1-5.654 2.342zM455.858 336.114a7.97 7.97 0 0 1-5.654-2.342l-79.984-79.984a7.996 7.996 0 1 1 11.31-11.31l79.984 79.984a7.996 7.996 0 0 1-5.656 13.652z" fill="" /></svg></span>
                                    </div>
                                </Link>
                                <div className="text-2xl text-gray-300 ">|</div>
                                {/* User Icon */}
                                <div className=" hover-container">
                                    <Link className="" href="/my-account">
                                        <svg
                                            className="w-full"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="black"
                                        >
                                            <path d="M12 12c2.97 0 5.4-2.43 5.4-5.4S14.97 1.2 12 1.2 6.6 3.63 6.6 6.6 9.03 12 12 12zm0 2.4c-3.18 0-9.6 1.59-9.6 4.8V21h19.2v-1.8c0-3.21-6.42-4.8-9.6-4.8z" />
                                        </svg>

                                    </Link>
                                </div>
                                <div className="text-2xl text-gray-300 ">|</div>
                                {/* Cart */}
                                <div className=" d-flex align-items-center">
                                    <CartModal />
                                </div>
                                <div className="text-2xl text-gray-300 ">|</div>
                                <div className=" d-flex align-items-center">
                                    <MenuModal categoriesPromise={categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            <div className="header-bottom fs-13 bg-white">
                <div className="container d-flex align-items-center overflow-x-scroll">
                    {/* <CategoryList categoriesPromise={categories} /> */}

                    <nav className="navigation flex-grow-1">
                        <ul className="navigation__list list-unstyled  color-body">
                            <Nav />
                            {/* <li className="navigation__item ms-auto">
                            <span className="fw-semi-bold text-uppercase color-body">
                                Need help? +91 123 456 789
                            </span>
                        </li> */}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
