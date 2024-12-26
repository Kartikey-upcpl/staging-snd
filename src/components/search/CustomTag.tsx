import React from 'react';
import { Tag } from '@/lib/wordpress/types';

import { useRefinementList, UseRefinementListProps, useMenu, UseMenuProps } from 'react-instantsearch';
import { classnames } from '@/utlis/classnames';

type PropsType = UseRefinementListProps & {
  tags: Tag[],
}

export function CustomTag(props: PropsType) {
  const { items, refine } = useRefinementList(props);
  return items
    .sort((a, b) => {
      const taga = props.tags.find(t => t.slug === a.value);
      const tagb = props.tags.find(t => t.slug === b.value);
      return (taga?.name ?? a.label).toUpperCase().localeCompare((tagb?.name ?? b.label).toUpperCase());
    })
    .map((item) => {
      const tag = props.tags.find(t => t.slug === item.value);
      return (
        <div
          key={item.value}
          onClick={() => refine(item.value)}
          className={`search-suggestion__item multi-select__item text-primary text-sm js-search-select js-multi-select ${item.isRefined == true
            ? "mult-select__item_selected"
            : ""
            }`}
        >
          <span className="me-auto">{tag?.name ?? item.label}</span>
          <span className="text-secondary">{item.count}</span>
        </div>
      )
    });
}

type MenuPropsType = UseMenuProps & {
  tags: Tag[],
}

export function CustomMenuTag(props: MenuPropsType) {
  const { items, createURL, refine } = useMenu(props);

  return (
    <ul className="ais-HierarchicalMenu-list">
      {items
        .sort((a, b) => {
          const taga = props.tags.find(t => t.slug === a.value);
          const tagb = props.tags.find(t => t.slug === b.value);
          return (taga?.name ?? a.label).toUpperCase().localeCompare((tagb?.name ?? b.label).toUpperCase());
        })
        .map((item) => {
          const tag = props.tags.find(t => t.slug === item.value);
          return (
            <li className="ais-HierarchicalMenu-item" key={item.value}>
              <a
                className={classnames(
                  "flex py-1 text-sm gap-2 items-center",
                  {
                    "text-pink-600 font-medium hover:text-pink-600": item.isRefined,
                    "hover:text-pink-700": !item.isRefined,
                  }
                )}
                href={item.isRefined ? "": createURL(item.value)}
                onClick={(e) => {
                  e.preventDefault();
                  refine(item.value);
                }}
              >
                <span className="flex-1">
                  {tag?.name ?? item.label} {" "}
                  <i className='font-light text-xs'>({item.count})</i>
                </span>
              </a>
            </li>
          );
        })}
    </ul>
  );
}