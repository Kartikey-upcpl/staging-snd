import React from 'react';
import {
    useHierarchicalMenu,
    UseHierarchicalMenuProps,
} from 'react-instantsearch';

import { classnames } from '@/utlis/classnames';

function CustomHierarchicalMenu(props: UseHierarchicalMenuProps) {
    const {
        items,
        refine,
        canToggleShowMore,
        toggleShowMore,
        isShowingMore,
        createURL,
    } = useHierarchicalMenu(props);

    return (
        <>
            <HierarchicalList
                items={items}
                onNavigate={refine}
                createURL={createURL}
            />
            {props.showMore && (
                <button disabled={!canToggleShowMore} onClick={toggleShowMore}>
                    {isShowingMore ? 'Show less' : 'Show more'}
                </button>
            )}
        </>
    );
}

type HierarchicalListProps = Pick<
    ReturnType<typeof useHierarchicalMenu>,
    'items' | 'createURL'
> & {
    onNavigate(value: string): void;
};

function HierarchicalList({
    items,
    createURL,
    onNavigate,
}: HierarchicalListProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <div className='HierarchicalMenu'>
            <ul className="ais-HierarchicalMenu-list">
                {items.map((item) => {
                    const checkChildRefined = !!item.data?.find(value => value.isRefined === true);
                    return (
                        <li className="ais-HierarchicalMenu-item" key={item.value}>
                            <a
                                className={classnames(
                                    "flex py-1 text-sm gap-2 items-center",
                                    {
                                        "text-pink-600 font-medium hover:text-pink-600": item.isRefined && !checkChildRefined,
                                        "hover:text-pink-700": !(item.isRefined && !checkChildRefined),
                                    }
                                )}
                                href={createURL(item.value)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(item.value);
                                }}
                            >
                                <span className="flex-1">
                                    {item.label} {" "}
                                    <i className='font-light text-xs'>({item.count})</i>
                                </span>
                                {item.data && item.data.length > 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                )}
                            </a>
                            {item.data && (
                                <HierarchicalList
                                    items={item.data}
                                    onNavigate={onNavigate}
                                    createURL={createURL}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CustomHierarchicalMenu;