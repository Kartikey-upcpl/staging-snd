"use client"
import React from "react";
import Link from "next/link";
import Image from "@/components/image/Image";
import { footerLinks1, footerLinks2, socialLinks } from "@/data/footer";
import FooterPopularSearches from "./FooterPopularSearches";
import FooterBottom from "./FooterBottom";
import { usePathname } from "next/navigation";

export default function Footer() {

  const pathname = usePathname();
  if (pathname === "/snd-vshop") {
    return null; // Do not render anything for this route
  }

  return (
    <>
      <footer className="bg-[#263547] text-white hidden sm:block ">
        {/* Popular Searches */}
        <FooterPopularSearches />

        {/* Footer Middle Section */}
        <div className="container mx-auto px-4 max-w-6xl mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and App Links */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <Link href="/">
                <Image
                  src="/assets/staranddaisy/logo-footer-white.png"
                  width={265}
                  height={100}
                  alt="StarAndDaisy"
                  className="mx-auto md:mx-0 mb-4"
                />
              </Link>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link href="/https://apps.apple.com/us/app/staranddaisy-baby-and-kids/id1593412273">
                  <Image
                    src="/assets/images/footer/footer_appstore.png"
                    width={130}
                    height={100}
                    alt="App Store"
                    className=""
                  />
                </Link>
                <Link href="/https://play.google.com/store/apps/details?id=com.staranddaisy.android">
                  <Image
                    src="/assets/images/footer/footer_playstore.png"
                    width={130}
                    height={100}
                    alt="Google Play"
                    className=""
                  />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="text-lg text-white font-semibold mb-1">
                Quick Links
              </h6>
              <ul className="space-y-2">
                {footerLinks1.map((elm, i) => (
                  <li className="border-b" key={i}>
                    <Link
                      href={elm.href}
                      className="text-white menu-link menu-link_us-s"
                    >
                      <span>{elm.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Policies */}
            <div>
              <h6 className="text-lg text-white font-semibold mb-1">
                Our Policies
              </h6>
              <ul className="space-y-2 ">
                {footerLinks2.map((elm, i) => (
                  <li className=" border-b" key={i}>
                    <Link
                      href={elm.href}
                      className="text-white menu-link menu-link_us-s "
                    >
                      {elm.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h6 className="text-lg text-white font-semibold mb-1">Share Us</h6>
              <ul className="flex justify-center md:justify-start py-2">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="footer__social-link d-block"
                    >
                      <svg
                        className={link.className}
                        width={link.width}
                        height={link.height}
                        viewBox={link.viewBox}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {typeof link.icon === "string" ? (
                          <use href={link.icon} />
                        ) : (
                          link.icon
                        )}
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="bg-white space-y-1 p-2 rounded-lg max-w-36">
                {" "}
                <Image
                  src="/assets/images/footer/scamadviser.jpg"
                  width={130}
                  height={100}
                  alt="Google Play"
                  className=""
                />{" "}
                <Image
                  src="/assets/images/footer/footer_trustpilot.jpg"
                  width={130}
                  height={100}
                  alt="Google Play"
                  className=""
                />{" "}
                <Image
                  src="/assets/images/footer/iso's.jpg"
                  width={130}
                  height={100}
                  alt="Google Play"
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t-2 border-white py-4 flex justify-between">
            {/* Left copyright text */}
            <div className="text-center text-sm text-white">
              © {new Date().getFullYear()} StarAndDaisy
            </div>

            {/* Social Icons with Spacing */}
            <div className="flex space-x-4">
              {" "}
              {/* Adjust the space here */}
              {socialLinks.map((link, index) => (
                <div
                  className="h-8 w-8 border border-white rounded-full flex items-center justify-center cursor-pointer"
                  key={index}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="hover:text-red-600"
                      width={link.width}
                      height={link.height}
                      viewBox={link.viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                    >
                      {typeof link.icon === "string" ? (
                        <use href={link.icon} />
                      ) : (
                        link.icon
                      )}
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className=" text-sm text-white flex space-x-4">
              <Link className="hover:text-red-300" href="/">
                GEARS
              </Link>
              <Link
                className="hover:text-red-300"
                href="/kids-furniture-toys-games-rideons-scooter-bunkbed-tricycle-bicycle"
              >
                KIDS
              </Link>
              <Link className="hover:text-red-300" href="/toy-world">
                TOYS WORLD
              </Link>

              <Link className="hover:text-red-300" href="/baby-basics">
                BASICS
              </Link>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
      </footer>
      <div>
        <FooterBottom />
      </div>
    </>
  );
}
