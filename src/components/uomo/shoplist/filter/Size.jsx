"use client";
import { sizes } from "@/data/products/productFilterOptions";
import { useState } from "react";

export default function Size() {
  const [activeSizes, setActiveSizes] = useState([]);
  const toggleSize = (size) => {
    if (activeSizes.includes(size)) {
      setActiveSizes((pre) => [...pre.filter((elm) => elm != size)]);
    } else {
      setActiveSizes((pre) => [...pre, size]);
    }
  };
  return (
    <div className="accordion" id="size-filters">
      <div className="accordion-item mb-4 pb-3">
        <h5 className="accordion-header" id="accordion-heading-size">
          <button
            className="accordion-button p-0 border-0 fs-5 text-uppercase"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#accordion-filter-size"
            aria-expanded="true"
            aria-controls="accordion-filter-size"
          >
            Sizes
            <svg
              className="accordion-button__icon type2"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g aria-hidden="true" stroke="none" fillRule="evenodd">
                <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" />
              </g>
            </svg>
          </button>
        </h5>
        <div
          id="accordion-filter-size"
          className="accordion-collapse collapse show border-0"
          aria-labelledby="accordion-heading-size"
          data-bs-parent="#size-filters"
        >
          <div className="accordion-body px-0 pb-0">
            <div className="d-flex flex-wrap">
              {sizes.map((elm, i) => (
                <a
                  key={i}
                  onClick={() => toggleSize(elm)}
                  className={`swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter ${
                    activeSizes.includes(elm) ? "swatch_active" : ""
                  } `}
                >
                  {elm}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /.accordion-item --> */}
    </div>
  );
}
