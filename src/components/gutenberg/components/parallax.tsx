export function ParallaxComponent({
    id,
    parallax,
    children,
    className,
    style,
    type,
}: {
    id?: string | undefined,
    parallax: string | number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties
    type: string,
}) {

    if (parallax !== "" && parallax !== "0" && parallax !== 0) {
        switch (type) {
            case "section":
                return (
                    <div
                        id={id}
                        className={className && className !== "" ? `${className} parallax-active` : "parallax-active"}
                        data-parallax-container=".section"
                        data-parallax-background
                        data-parallax={parallax}
                        style={{
                            ...(style ?? {}),
                            height: "863px",
                            transform: "translate3d(0px, -31.7px, 0px)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        {children}
                    </div>
                );
            case "col":
                return (
                    <div
                        id={id}
                        className={className && className !== "" ? `${className} parallax-active` : "parallax-active"}
                        data-parallax-fade={true}
                        data-parallax={parallax}
                        style={{
                            ...(style ?? {}),
                            transform: "translate3d(0px, 24.4px, 0px)",
                            backfaceVisibility: "hidden",
                            opacity: 0.9
                        }}
                    >
                        {children}
                    </div>
                );
        }

    }

    return (
        <div id={id} className={className} style={style}>
            {children}
        </div>
    );
}
