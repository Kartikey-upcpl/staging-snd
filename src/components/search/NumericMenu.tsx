import React from 'react';
import {
  useNumericMenu,
  UseNumericMenuProps,
} from 'react-instantsearch';

export default function NumericMenu(props: UseNumericMenuProps) {
  const { items, refine } = useNumericMenu(props);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.value}>
          <label>
            <input
              type="radio"
              name={item.label}
              defaultChecked={item.isRefined}
              onChange={(event) => {
                event.preventDefault();

                refine(item.value);
              }}
            />
            <span>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}