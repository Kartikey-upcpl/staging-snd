import { useToggleRefinement } from "react-instantsearch";

interface CustomToggleRefinementProps {
    attribute: string;
    label: string;
    on: boolean | string | number;
}

export default function CustomToggleRefinement({
    attribute,
    label,
    on
}: CustomToggleRefinementProps) {
    const { refine, value } = useToggleRefinement({ attribute: attribute, on: on });
    return (
        <div
            onClick={() => refine({ isRefined: value.isRefined })}
            className={`search-suggestion__item multi-select__item text-primary text-sm js-search-select js-multi-select ${value.isRefined == true
                    ? "mult-select__item_selected"
                    : ""
                }`}
        >
            <span className="me-auto">{label}</span>
            <span className="text-secondary">{value.count}</span>
        </div>
    );
}