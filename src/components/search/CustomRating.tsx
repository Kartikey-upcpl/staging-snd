import { useConnector } from 'react-instantsearch';
import connectRatingMenu from 'instantsearch.js/es/connectors/rating-menu/connectRatingMenu';

import type {
    RatingMenuConnectorParams,
    RatingMenuWidgetDescription,
} from 'instantsearch.js/es/connectors/rating-menu/connectRatingMenu';
import { IntStarRating } from "@/components/ui/InputRating";
export type UseRatingMenuProps = RatingMenuConnectorParams;

export function useRatingMenu(props?: UseRatingMenuProps) {
    return useConnector<RatingMenuConnectorParams, RatingMenuWidgetDescription>(
        connectRatingMenu,
        props
    );
}

export function CustomRating(props: UseRatingMenuProps) {
    const { items, refine, createURL } = useRatingMenu(props);
    return (
        <div className='ais-RatingMenu'>
            <ul className='ais-RatingMenu-list'>
                {items.map((item, _) => {
                    return (
                        <li key={item.value}>
                            <a
                                href={createURL(item.value)}
                                onClick={(event) => {
                                    event.preventDefault();
    
                                    refine(item.value);
                                }}
                                className={`search-suggestion__item multi-select__item text-primary text-sm js-search-select js-multi-select after:rounded-full before:rounded-full ${item.isRefined
                                        ? "mult-select__item_selected"
                                        : ""
                                    }`}
                            >
                                <span className="me-auto flex items-center gap-1 text-sm"><IntStarRating value={Number(item.value)}/> {Number(item.value) < 5 && "& Up"}</span>
                                <span className="text-secondary">{item.count ?? 0}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}