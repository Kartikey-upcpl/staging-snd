"use client";
import Link from "next/link";
import CartLength from "./components/CartLength";
import Nav from "./components/Nav";
import { openCart } from "@/utlis/openCart";
import Image from '@/components/image/Image';
import User from "./components/User";
import { currencyOptions, languageOptions2 } from "@/data/footer";
import { socialLinks } from "@/data/socials";
import CategorySelect from "./components/CategorySelect";

export default function Header11() {
  return (
    <header id="header" className="header sticky_disabled w-100">
      <div className="header-top bordered">
        <div className="container d-flex align-items-center">
          <ul className="list-unstyled d-flex flex-1 gap-3 m-0">
            <li>
              <a href="#" className="menu-link menu-link_us-s">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="menu-link menu-link_us-s">
                FAQ
              </a>
            </li>
            <li>
              <Link href="/contact" className="menu-link menu-link_us-s">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="menu-link menu-link_us-s">
                Track Order
              </a>
            </li>
          </ul>
          <p className="mx-auto mb-0 d-none d-xl-block">
            FREE SHIPPING WORLDWIDE
          </p>
          <div className="heeader-top__right flex-1 d-flex gap-1 justify-content-end">
            <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
              {socialLinks.map((link, index) => (
                <li key={index}>
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
            <select
              className="form-select form-select-sm bg-transparent"
              name="store-language"
            >
              {languageOptions2.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <select
              className="form-select form-select-sm bg-transparent"
              name="store-currency"
            >
              {currencyOptions.map((option, index) => (
                <option
                  key={index}
                  className="footer-select__option"
                  value={option.value}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="header-desk_type_6">
        <div className="header-middle">
          <div className="container d-flex align-items-center">
            <div className="logo text-center">
              <Link href="/">
                <Image
                  src="/assets/staranddaisy/logo.png"
                  width={143}
                  height={54}
                  alt="Uomo 11"
                  className="logo__image"
                />
              </Link>
            </div>
            {/* <!-- /.logo --> */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="header-search search-field"
            >
              <input
                className="header-search__input w-100"
                type="text"
                name="search-keyword"
                placeholder="Search products..."
              />
              <CategorySelect />
              <button className="btn header-search__btn" type="submit">
                <svg
                  className="d-block"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_search" />
                </svg>
              </button>
            </form>
            {/* <!-- /.header-search --> */}

            <div className="header-tools d-flex align-items-center">
              <div className="header-tools__item hover-container">
                <a className="header-tools__item js-open-aside" href="#">
                  <User />
                </a>
              </div>

              <Link className="header-tools__item" href="/account_wishlist">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_heart" />
                </svg>
              </Link>

              <a
                onClick={() => openCart()}
                className="header-tools__item header-tools__cart js-open-aside"
              >
                <svg
                  className="d-block"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_cart" />
                </svg>
                <span className="cart-amount d-block position-absolute js-cart-items-count">
                  <CartLength />
                </span>
              </a>

              <a
                className="header-tools__item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#siteMap"
              >
                <svg
                  className="nav-icon"
                  width="25"
                  height="18"
                  viewBox="0 0 25 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="25" height="2" />
                  <rect y="8" width="20" height="2" />
                  <rect y="16" width="25" height="2" />
                </svg>
              </a>
            </div>
            {/* <!-- /.header__tools --> */}
          </div>
        </div>
        {/* <!-- /.header-middle --> */}

        <div className="header-bottom">
          <div className="container d-flex align-items-center">
            <div className="categories-nav position-relative">
              <h3 className="categories-nav__title">Browse Categories</h3>
              <ul className="categories-nav__list list-unstyled">
                <li className="categories-nav__item">
                  <Link href="/shop-1">Electronics</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Computers</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Audio & Video</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Mobiles & Tablets</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">TV & Audio</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Car & Motorbike</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Hmoe & Garden</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Toys & Kids</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Sporting Goods</Link>
                </li>
                <li className="categories-nav__item">
                  <Link href="/shop-1">Pet Supplies</Link>
                </li>
              </ul>
            </div>

            <nav className="navigation flex-grow-1">
              <ul className="navigation__list list-unstyled d-flex">
                <Nav />

                <li className="navigation__item ms-auto">
                  <a href="#" className="navigation__link">
                    Special Offer
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="#" className="navigation__link">
                    Purchase Theme
                  </a>
                </li>
              </ul>
              {/* <!-- /.navigation__list --> */}
            </nav>
            {/* <!-- /.navigation --> */}
          </div>
        </div>
        {/* <!-- /.header-bottom --> */}
      </div>
      {/* <!-- /.header-desk header-desk_type_6 --> */}
    </header>
  );
}