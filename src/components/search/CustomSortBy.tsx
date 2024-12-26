import React from 'react';
import {
  useSortBy,
  UseSortByProps,
} from 'react-instantsearch';

export default function CustomSortBy(props: UseSortByProps) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <select
      className="shop-acs__select form-select bg-transparent w-auto border-0 py-0 order-1 order-md-0 !leading-normal"
      onChange={(event) => refine(event.target.value)}
      value={currentRefinement}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}