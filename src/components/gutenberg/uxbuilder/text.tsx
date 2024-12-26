import { randomGeneralKey, getStyleTag, formatHtml } from "./definitions";
import { renderHtml } from "./html";
import { parse } from './libs/himalaya';
import clsx from "clsx";

export function TextElement({
  options,
  content,
}: {
  options: { [key: string]: any };
  content: string,
}) {
  const key = "text-" + randomGeneralKey().toString();
  const classOption = options?.class ?? '';
  const visibility = options?.visibility ?? '';

  const rules = {
    fontSize: {
      selector: '',
      property: 'font-size',
      unit: "rem"
    },
    lineHeight: {
      selector: '',
      property: 'line-height',
    },
    textAlign: {
      selector: '',
      property: 'text-align',
    },
    textColor: {
      selector: ', > *',
      property: 'color',
    }
  };

  const style: string = getStyleTag(key, rules , options);

  const json = parse(formatHtml(content));

  return (
    <div
      id={key}
      className={clsx("text", {
        [classOption]: !!classOption,
        [visibility]: visibility !== "",
      })}
    >
      {renderHtml(json)}
      {style !== "" && (
          <style dangerouslySetInnerHTML={{ __html: style }} />
      )}
    </div>
  );
}
