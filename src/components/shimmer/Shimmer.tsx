import clsx from "clsx";


interface ShimmerProps {
    loading: boolean | undefined;
    width: number | string;
    height: number | string;
    className?: string;
    children: React.ReactNode;
    tag?: string;
    backgroundSize?: string;
}

export default function Shimmer({ loading, width, height, className, children, tag, backgroundSize }: ShimmerProps) {
    if (!loading) {
        return children;
    }
    const classNames = clsx('shimmer-animation', className);
    const Tag = (tag || 'div') as keyof JSX.IntrinsicElements;
    return (
        <Tag className={classNames} style={{ width, height, borderRadius: 2, ...(!!backgroundSize && {backgroundSize: backgroundSize}) }}></Tag>
    );
}