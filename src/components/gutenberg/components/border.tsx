import { classnames } from "@/utlis/classnames";

export function BorderComponent({
    border,
    borderMargin,
    borderStyle,
    borderRadius,
    borderColor,
    borderHover,
    children,
}: {
    border: string;
    borderMargin: string;
    borderStyle: string;
    borderRadius: string | number;
    borderColor: string;
    borderHover: string;
    children?: React.ReactNode;
}) {

    if (border !== "") {

        let style: React.CSSProperties = {
            borderWidth: border,
        };
        
        if (borderColor !== "") {
            style.borderColor = borderColor;
        }

        if (borderRadius !== "" && borderRadius !== "0" && borderRadius !== 0) {
            style.borderRadius = `${borderRadius}px`;
        }

        if (borderMargin !== "" ) {
            style.margin = borderMargin;
        }

        return (
            <>
                <div
                    className={classnames(
                        "is-border",
                        {
                            [`is-${borderStyle}`]: borderStyle !== "",
                            [`hover-${borderHover}`]: borderHover !== "",
                        }
                    )}
                    style={style}    
                >
                </div>
                {children}
            </>
        );
    }

    return children;
}
