export function classnames(initClassname: string, options: {[key: string]: boolean}): string {
    var text = initClassname;

    const keysClassUsed = Object.keys(options).filter((key) => key !== "" && options[key] === true);

    if (keysClassUsed.length > 0) {
        text = [text, ...keysClassUsed].join(" ");
    }

    return text;
}