import { classnames } from "@/utlis/classnames";

export function DividerComponent({
    type,
    direction = "bottom",
    isFlip = false,
    isFront = false,
}: {
    type: string,
    direction?: "top" | "bottom",
    isFlip?: boolean,
    isFront?: boolean,
}) {

    let child = undefined;

    switch (type) {
        case "arrow":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100H0L0 96H483L500 79L517 96H1000V100Z"></path>
                </svg>
            );
            break;
        case "arrow-invert":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100H0V80H483L500 97L517 80H1000V100Z"></path>
                </svg>
            );
            break;
        case "arrow-2":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100H0L0 96H480.929C482.255 96 483.527 95.4732 484.464 94.5355L497.879 81.1213C499.05 79.9497 500.95 79.9497 502.121 81.1213L515.536 94.5355C516.473 95.4732 517.745 96 519.071 96H1000V100Z"></path>
                </svg>
            );
            break;
        case "arrow-2-invert":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100H0V80H479.686C481.808 80 483.843 80.8429 485.343 82.3432L497.879 94.8787C499.05 96.0503 500.95 96.0503 502.121 94.8787L514.657 82.3431C516.157 80.8428 518.192 80 520.314 80H1000V100Z"></path>
                </svg>
            );
            break;
        case "book":
            child = (
                <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M0 0V120L600 120V116C589.054 85.1181 533.5 0 291.5 0H0Z"></path>
                    <path className="ux-shape-fill" d="M1200 0V120L600 120V116C610.945 85.1181 666.5 0 908.5 0H1200Z"></path>
                </svg>
            );
            break;
        case "book-invert":
            child = (
                <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M908.5 120H291.5C533.5 120 589.054 34.8819 600 4C610.945 34.8819 666.5 120 908.5 120Z"></path>
                </svg>
            );
            break;
        case "curve":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M0 0C0 0 200 50 500 50C800 50 1000 0 1000 0V101H0V1V0Z"></path>
                </svg>
            );
            break;
        case "curve-invert":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M500 47.0297C184.4 47.0297 -26 100 -26 100H1026C1026 100 815.6 47.0297 500 47.0297ZM1026 -5.94059H-26V-7H1026V-5.94059Z"></path>
                </svg>
            );
            break;
        case "curve-2":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M-24 100C493.5 -2.66667 804 -2.66667 1011 100H-24Z"></path>
                </svg>
            );
            break;
        case "curve-2-invert":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100H0V4.71656C494.161 100.895 796.31 101.094 1000 5.31298V100Z"></path>
                </svg>
            );
            break;
        case "curve-opacity":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" opacity="0.15" d="M0 14C0 14 88.64 17.48 300 50C560 90 814 77 1003 40L1015 68L1018 104H0V14Z"></path>
                    <path className="ux-shape-fill" opacity="0.3" d="M0 45C0 45 271 90.13 500 77C657 68 830 30 1015 14V100H0V45Z"></path>
                    <path className="ux-shape-fill" d="M0 58C0 58 188.29 90 508 90C798 90 1002 55 1002 55V100H0V58Z"></path>
                </svg>
            );
            break;
        case "fan":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M500 50L1067.25 102.5H-67.2466L500 50Z"></path>
                    <path className="ux-shape-fill" opacity="0.15" d="M1011 2.70583L500 50.0001L-12 2.61328V105H1011V2.70583Z"></path>
                    <path className="ux-shape-fill" opacity="0.3" d="M-13 50H1010V105H-13V50Z"></path>
                </svg>
            );
            break;
        case "tilt":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1000 100V0L-40 100H1000Z"></path>
                </svg>
            );
            break;
        case "triangle":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1025 103H-25L500 3L1025 103Z"></path>
                </svg>
            );
            break;
        case "triangle-invert":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M500 95.6L0 0V100H1000V0L500 95.6Z"></path>
                </svg>
            );
            break;
        case "triangle-opacity":
            child = (
                <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M1025 100H-25L500 24L1025 100Z"></path>
                    <path className="ux-shape-fill" opacity="0.3" d="M1025 100H-25L500 0L1025 100Z"></path>
                </svg>
            );
            break;
        case "waves":
            child = (
                <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M321.39 63.56c58 10.79 114.16 30.13 172 41.86 82.39 16.72 168.19 17.73 250.45.39C823.78 89 906.67 48 985.66 27.17c70.05-18.48 146.53-26.09 214.34-3V120H0V92.65a600.21 600.21 0 01321.39-29.09z"></path>
                </svg>
            );
            break;
        case "waves-opacity":
            child = (
                <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" d="M0 300L-1 69.71C216 57 299.47 198.86 403 226C506 253 577 196 660 197C740 198 790.09 234.07 874 267C935.23 291 982 282.61 1000 277.61V300H0Z"></path>
                    <path className="ux-shape-fill" opacity="0.5" d="M1 265.094L0 50.5C217 37.79 300.47 186.36 404 213.5C507 240.5 578 196.5 661 197.5C741 198.5 787.59 239.57 871.5 272.5C932.73 296.5 980.5 284.5 998.5 279.5V298.5L1 265.094Z"></path>
                    <path className="ux-shape-fill" opacity="0.15" d="M0.999878 244.094L-0.00012207 27C217 14.29 300.47 173.86 404 201C507 228 578 196 661 197C741 198 787.59 243.07 871.5 276C932.73 300 980.5 284.5 998.5 279.5V299L0.999878 244.094Z"></path>
                </svg>
            );
            break;
        case "waves-opacity-2":
            child = (
                <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" opacity="0.15" d="M0 299L-2 19.9998C153 -16.0002 308 155 413 184C515.64 212.35 562 152 645 153C725 154 787 206 874 233C939.54 253.34 975 248 1000 244.61V299H0Z"></path>
                    <path className="ux-shape-fill" opacity="0.3" d="M0 300L-2 34C155 -9.00003 300 178 403 212C504.11 245.38 562 165 645 166C725 167 790.09 220.07 874 253C939.21 278.59 978.07 269.72 1000 263.61V300H0Z"></path>
                    <path className="ux-shape-fill" d="M0 300L-1 69.7099C216 56.9999 299.47 198.86 403 226C506 253 577 196 660 197C740 198 790.09 234.07 874 267C935.23 291 982 282.61 1000 277.61V300H0Z"></path>
                </svg>
            );
            break;
        case "waves-opacity-3":
            child = (
                <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="ux-shape-fill" opacity="0.05" d="M1014 264V386H206L34 300C34 300 344.42 277.16 436 221C542 156 590 160 704 209C811 255 899.11 214.94 979 346L1014 264Z"></path>
                    <path className="ux-shape-fill" opacity="0.1" d="M-302 55C-302 55 -66.73 263.25 50 214C178 160 283 116 353 141C445.68 174.1 534.28 256.19 588 249C692.9 235 764.52 75.94 855 131C940.61 183.09 1000 254 1000 254V328L-306 338L-302 55Z"></path>
                    <path className="ux-shape-fill" opacity="0.15" d="M-286 255C-286 255 -72 152 52 126C176 100 255 155 436 227C581.57 284.91 614.7 277.79 708 227C787 184 1009 3.0001 1093 164C1146 265.63 1031 293 1031 293L924 377L-288 389L-286 255Z"></path>
                    <path className="ux-shape-fill" opacity="0.3" d="M-24 69C-24 69 275.68 370.66 389 314C397 310 622 316 673 356C690.47 369.7 845 224 890 182C944.8 130.85 1018 92 1078 143C1154.12 207.7 1196 242 1196 242L1184 374L-28 386L-24 69Z"></path>
                    <path className="ux-shape-fill" d="M-12 201C-12 201 58 284 182 258C306 232 342.29 221.23 456 264C565 305 640.82 288.36 721 249C776 222 837.5 191.31 935 253C984 284 1030 279 1030 279L1024 430L-12 440V201Z"></path>
                </svg>
            );
            break;
    }


    if (child) {
        return (
            <div
                className={classnames(
                    `ux-shape-divider ux-shape-divider--${direction} ux-shape-divider--style-${type}`,
                    {
                        "ux-shape-divider--flip": isFlip,
                        "ux-shape-divider--to-front": isFront,
                    }
                )}
            >{child}</div>
        );
    }

    return undefined;
}
