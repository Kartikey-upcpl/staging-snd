import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';
import { deals } from "@/utlis/product";

export function CustomDeal(props: UseRefinementListProps) {
  const { items, refine } = useRefinementList(props);

  return items
    .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()))
    .map((item) => {
      const deal = deals?.find(d => d.key === item.value);
      return (
          <div
              key={item.value}
              onClick={() => refine(item.value)}
              className={`search-suggestion__item multi-select__item text-primary text-sm js-search-select js-multi-select ${item.isRefined == true
                      ? "mult-select__item_selected"
                      : ""
                  }`}
          >
              <span className="me-auto">{deal?.name ?? item.label}</span>
              <span className="text-secondary">{item.count}</span>
          </div>
      )
    });
}