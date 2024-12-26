import { JSX, ClassAttributes, ImgHTMLAttributes } from "react";

export default function Image(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) {
    const {src, ...restProps} = props;
    return (
        <img src={src ?? '/assets/images/no-image.jpg'} loading="lazy" alt="Image" {...restProps} />
    )
}