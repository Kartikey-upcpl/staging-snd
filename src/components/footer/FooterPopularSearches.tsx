"use client";
import { PopularSearches } from "@/data/footer";
import Link from "next/link";

export default function FooterPopularSearches() {
  return (
    <div className="footer-top container ">
      <div className="text-center m-auto max-w-[57rem] ">
        <h3 className="text-xl text-white ">Popular Searches</h3>
        <div className="flex flex-wrap justify-center space-x-2 my-4">
          {PopularSearches.map((item, index) => (
            <div key={index} className="text-white">
              <Link className="hover:text-red-300" href={item?.Linkto}>
                {item.Name}
                {index !== PopularSearches.length - 1 && " |"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
