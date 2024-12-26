export function StickyComponent({
    sticky,
    stickyMode,
    children,
}: {
    sticky: string;
    stickyMode: string;
    children: React.ReactNode;
}) {

    if (sticky === "true") {
        if (stickyMode === "javascript") {
            return (
                <div
                    className="is-sticky-column"
                    data-sticky-mode="javascript"
                    style={{ top: 130 }}
                >
                    <div className="is-sticky-column__inner">
                        {children}
                    </div>
                </div>
            );
        }

        return (
            <div className="is-sticky-column">
                <div className="is-sticky-column__inner">
                    {children}
                </div>
            </div>
        )
    }

    return children;
}
