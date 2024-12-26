import React from "react";

const colorRating = "#ffa41c";
const colorUnrating = "rgb(228, 228, 228)";

function Star({ size = 25, selected = false, onClick }: { size?: number, selected: boolean, onClick?: () => void }) {
    return (
        <svg
            onClick={onClick}
            className="star-rating__star-icon"
            width={size}
            height={size}
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: selected ? colorRating : colorUnrating }}
        >
            <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
        </svg>
    );
}

export function IntStarRating({ value, size = 12 }: { value: number, size?: number }) {
    const count = value < 1 ? 1 : value > 5 ? 5 : value;

    const arrRating = Array(5).fill(0);
    return (
        <div className="flex gap-0.5">
            {arrRating.map((_, index) => {
                return (
                    <Star
                        key={index}
                        size={size}
                        selected={count >= index + 1}
                    />
                )
            })}
        </div>
    )
}

export function FloatStarRating({ value }: { value: number }) {

    var style: React.CSSProperties = {
        lineHeight: 0,
    }

    if (value === 0) {
        return null
        // style["backgroundColor"] = colorUnrating;
    } else if (value >= 5) {
        style["backgroundColor"] = colorRating;
    } else {
        const percent = (value / 5) * 100;
        style["backgroundImage"] = `linear-gradient(to right, ${colorRating} ${percent}% , ${colorUnrating} ${percent}%, ${colorUnrating})`;
    }

    return (
        <span
            className="!block" style={style}
        >
            <svg width="81" height="18" viewBox="0 0 81 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M81 0H0V18H81V0ZM74.443 7.46649L72.675 2.025L70.9069 7.46649L65.1854 7.46649L69.8142 10.8295L68.0462 16.271L72.675 12.908L77.3038 16.271L75.5358 10.8295L80.1646 7.46649L74.443 7.46649ZM56.475 2.025L58.243 7.46649L63.9646 7.46649L59.3358 10.8295L61.1038 16.271L56.475 12.908L51.8462 16.271L53.6142 10.8295L48.9854 7.46649L54.707 7.46649L56.475 2.025ZM42.043 7.46649L40.275 2.025L38.507 7.46649L32.7854 7.46649L37.4142 10.8295L35.6462 16.271L40.275 12.908L44.9038 16.271L43.1358 10.8295L47.7646 7.46649L42.043 7.46649ZM24.075 2.025L25.843 7.46649L31.5646 7.46649L26.9358 10.8295L28.7038 16.271L24.075 12.908L19.4462 16.271L21.2142 10.8295L16.5854 7.46649L22.307 7.46649L24.075 2.025ZM9.64305 7.46649L7.875 2.025L6.10695 7.46649L0.38543 7.46649L5.01424 10.8295L3.24619 16.271L7.875 12.908L12.5038 16.271L10.7358 10.8295L15.3646 7.46649L9.64305 7.46649Z" fill="white" />
            </svg>
        </span>
    );
}

export default function InputRating({ value, onChange, size = 25 }: { value: number, onChange: (value: number) => void, size?: number }) {
    const count = value < 1 ? 1 : value > 5 ? 5 : value;

    const arrRating = Array(5).fill(0);
    return (
        <div className="flex gap-0.5">
            {arrRating.map((_, index) => {
                return (
                    <Star
                        key={index}
                        size={size}
                        selected={count >= index + 1}
                        onClick={() => {
                            if (count !== index + 1) {
                                onChange(index + 1);
                            }
                        }}
                    />
                )
            })}

        </div>
    )
}