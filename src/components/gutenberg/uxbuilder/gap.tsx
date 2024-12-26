import clsx from "clsx";
import { randomGeneralKey, getStyleTag } from "./definitions";

export function Gap({ options } : { options: { [key: string]: any }; }) {

    const key = "gap-" + randomGeneralKey().toString();

    const visibility = options?.visibility ?? '';
    const classOption = options?.class ?? '';

    const rules = {
        height: {
            selector: "",
            property: "padding-top"
        }
    };

    const style = getStyleTag(key, rules, options);

    return (
        <div
            id={key}
            className={clsx(
                "gap-element clearfix", {
                    [classOption]: classOption !== "",
                    [visibility]: visibility !== "",
                }
            )}
            style={{ display: "block", height: 'auto'}}
        >
            {style !== "" && (
                <style dangerouslySetInnerHTML={{ __html: style}}/>
            )}
        </div>
    )
}