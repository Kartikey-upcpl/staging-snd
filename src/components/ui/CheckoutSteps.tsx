"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { classnames } from "@/utlis/classnames";
import Link from "next/link";

const steps = [
  {
    id: 1,
    href: "/cart",
    number: "01",
    title: "Shopping Bag",
    description: "Manage Your Items List",
  },
  {
    id: 2,
    href: "/checkout",
    number: "02",
    title: "Shipping and Checkout",
    description: "Checkout Your Items List",
  },
  {
    id: 3,
    href: "/checkout/order-received/",
    number: "03",
    title: "Order received",
    description: "Review Your Order",
  },
];

export default function CheckoutSteps() {
  const [activePathIndex, setactivePathIndex] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    const activeTab = steps.filter((elm) => elm.href == pathname)[0];
    const activeTabIndex = steps.indexOf(activeTab);
    setactivePathIndex(activeTabIndex);
  }, [pathname]);
  
  return (
    <div className="checkout-steps">
      {steps.map((elm, i) => (
        <Link
          key={i}
          className={classnames(
            "checkout-steps__item",
            {
              "active": activePathIndex >= i,
              "disabled": activePathIndex < i,
              "!cursor-auto": activePathIndex <= i,
            }
          )}
          href={activePathIndex > i ? elm.href : "#"}
        >
          <span className="checkout-steps__item-number">{elm.number}</span>
          <span className="checkout-steps__item-title">
            <span>{elm.title}</span>
            <em>{elm.description}</em>
          </span>
        </Link>
      ))}
    </div>
  );
}
