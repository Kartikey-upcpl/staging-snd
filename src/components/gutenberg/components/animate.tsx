export function AnimateComponent({
    id,
    animate,
    children,
    className,
    style
}: {
    id?: string | undefined,
    animate: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties
}) {

    if (animate !== "") {

        return (
            <div
                id={id}
                className={className}
                data-animate={animate}
                data-animate-transform={true}
                data-animate-transition={true}
                data-animated={true}
                style={style}
            >
                {children}
            </div>
        )
    }

    return (
        <div id={id} className={className} style={style}>
            {children}
        </div>
    );
}
