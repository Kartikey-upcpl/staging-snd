import React from "react";

const colorRating = "#ffa41c";
const colorUnrating = "rgb(228, 228, 228)";

export default function Star({ stars }: { stars: number }) {

    var style : React.CSSProperties  = {
        lineHeight: 0,
    }

    if (stars === 0) {
        style["backgroundColor"] = colorUnrating;
    } else if (stars >= 5) {
        style["backgroundColor"] = colorRating;
    } else {
        const percent = (stars / 5) * 100;
        style["backgroundImage"] = `linear-gradient(to right, ${colorRating} ${percent}% , ${colorUnrating} ${percent}%, ${colorUnrating})`;
    }

    return (
        <span
            className="d-inline" style={style}
        >
            <svg width="81" height="18" viewBox="0 0 81 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M81 0H0V18H81V0ZM74.443 7.46649L72.675 2.025L70.9069 7.46649L65.1854 7.46649L69.8142 10.8295L68.0462 16.271L72.675 12.908L77.3038 16.271L75.5358 10.8295L80.1646 7.46649L74.443 7.46649ZM56.475 2.025L58.243 7.46649L63.9646 7.46649L59.3358 10.8295L61.1038 16.271L56.475 12.908L51.8462 16.271L53.6142 10.8295L48.9854 7.46649L54.707 7.46649L56.475 2.025ZM42.043 7.46649L40.275 2.025L38.507 7.46649L32.7854 7.46649L37.4142 10.8295L35.6462 16.271L40.275 12.908L44.9038 16.271L43.1358 10.8295L47.7646 7.46649L42.043 7.46649ZM24.075 2.025L25.843 7.46649L31.5646 7.46649L26.9358 10.8295L28.7038 16.271L24.075 12.908L19.4462 16.271L21.2142 10.8295L16.5854 7.46649L22.307 7.46649L24.075 2.025ZM9.64305 7.46649L7.875 2.025L6.10695 7.46649L0.38543 7.46649L5.01424 10.8295L3.24619 16.271L7.875 12.908L12.5038 16.271L10.7358 10.8295L15.3646 7.46649L9.64305 7.46649Z" fill="white"/>
            </svg>
        </span>
    );
}
