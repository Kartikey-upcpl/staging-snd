import clsx from "clsx";
import { getStyleTag, randomGeneralKey } from "./definitions";

export function UxStackElement({ options, children }: {
    options: { [key: string]: any };
    children: React.ReactNode;
}) {
    const key = "stack-" + randomGeneralKey().toString();

    const visibility = options?.visibility ?? '';
    const classOption = options?.class ?? '';

    const rules = {
        direction: {
            selector: "",
            property: "flex-direction"
        },
        distribute: {
            selector: "",
            property: "justify-content"
        },
        align: {
            selector: "",
            property: "align-items"
        },
        gap: {
            selector: "",
            property: "gap",
            unit: "rem"
        }
    }
    const style = getStyleTag(key, rules, options);

    return (
        <div
            className={clsx("d-flex", {
                [classOption]: classOption.trim() !== "",
                [visibility]: visibility !== "",
            })}
        >
            {children}
            {style !== "" && (
                <style dangerouslySetInnerHTML={{ __html: style }} />
            )}
        </div>
    )
}