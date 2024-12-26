"use client";
import { FooterBottomLinks } from "@/data/footer";
import Link from "next/link";
import Image from "next/image";

export default function FooterBottom() {
  return (
    <div className="bg-white py-4 flex flex-col items-center ">
      <div className="">
        <Image
          src="/assets/images/footer/footer_bottom_payment.jpg"
          width={130}
          height={100}
          alt="App Store"
          className="w-64"
        />
      </div>
      <div className="flex flex-wrap justify-center space-x-2 my-2">
        {FooterBottomLinks.map((item, index) => (
          <div key={index} className="text-black">
            <Link className="hover:text-red-300" href={item?.Linkto}>
              {item.Name}
              {index !== FooterBottomLinks.length - 1 && " |"}
            </Link>
          </div>
        ))}
      </div>
      <div className="text-black font-medium">
        <p className="text-center 	">SND Digital Private Limited</p>
        <p className="text-center">
          Copyright 2024 © <span className="font-bold	">StarAndDaisy</span>{" "}
        </p>
      </div>
    </div>
  );
}
