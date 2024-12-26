'use client';
import { useState, useCallback, ReactNode } from "react";
import { classnames } from "@/utlis/classnames";

export default function Accordion({label, children} : { label: string, children?: ReactNode | undefined}) {
    const [ isOpen, setIsOpen ] = useState(true);

    const toggleIsOpen = useCallback(() => setIsOpen(isOpen => !isOpen), []);

    return (
        <div className="accordion">
            <div className="accordion-item mb-4">
                <h5 className="accordion-header">
                    <button
                        className={classnames(
                            "accordion-button p-0 border-0 fs-5 text-uppercase",
                            {
                                "collapsed": !isOpen
                            }
                        )}
                        type="button"
                        onClick={toggleIsOpen}
                    >
                        {label}
                        <svg className="accordion-button__icon" viewBox="0 0 14 14">
                            <g aria-hidden="true" stroke="none" fillRule="evenodd">
                                <path
                                    className="svg-path-vertical"
                                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                                />
                                <path
                                    className={classnames(
                                        "svg-path-horizontal",
                                        {
                                            "!opacity-100": !isOpen
                                        }
                                    )}
                                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                                />
                            </g>
                        </svg>
                    </button>
                </h5>
                <div
                    className={classnames(
                        "accordion-collapse show border-0",
                        {
                            "visible": isOpen,
                            "hidden": !isOpen,
                        }
                    )}
                >
                    <div className="accordion-body px-0 pb-0">
                        {children}
                    </div>
                </div>
            </div>
            {/* /.accordion-item */}
        </div>
    );
}