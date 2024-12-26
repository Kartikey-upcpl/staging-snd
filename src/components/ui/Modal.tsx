'use client';

import { useEffect, ReactNode } from "react";
import { classnames } from "@/utlis/classnames";

export const ModalHeader = ({ title, onClose, className }: { title: string, onClose: () => void, className?: string }) => {
    return (
        <div className={`modal-header ${className ?? ""}`}>
            <h5 className="modal-title text-lg font-semibold">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
        </div>
    );
};

export const ModalFooter = ({ className, children }: { className?: string, children?: ReactNode | undefined }) => {
    return (
        <div className={`modal-footer py-3 px-10 ${className ?? ""}`}>
            {children}
        </div>
    );
};

export default function Modal({
    showModal = false,
    onClose,
    children,
    size = "medium",
}: {
    showModal?: boolean,
    onClose?: () => void | undefined,
    children?: ReactNode | undefined,
    size?: "small" | "medium" | "large" | "extra-large" | "fullscreen"
}) {

    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body");
        if (showModal) {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.add('modal-open');
                bodyElement[0].classList.add('overflow-hidden');
            }
        } else {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.remove('modal-open');
                bodyElement[0].classList.remove('overflow-hidden');
            }
        }
    }, [showModal]);

    if (!showModal) {
        return undefined;
    }

    return (
        <div className="modal fade show block m-0">
            <div className="fixed inset-0 bg-black opacity-15" onClick={onClose} />
            <div
                className={classnames(
                    "modal-dialog modal-dialog-centered",
                    {
                        "modal-sm": size === "small",
                        "modal-lg": size === "large",
                        "modal-xl": size === "extra-large",
                        "modal-fullscreen": size === "fullscreen",
                    }
                )}
            >
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ModalPanel({ isOpen, title, onClose, children }: { isOpen: boolean, title: string | ReactNode, onClose: () => void, children?: ReactNode }) {

    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body");

        if (isOpen) {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.add('modal-open');
                bodyElement[0].classList.add('overflow-hidden');
            }
        } else {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.remove('modal-open');
                bodyElement[0].classList.remove('overflow-hidden');
            }
        }
    }, [isOpen]);

    if (!isOpen) {
        return undefined;
    }

    return (
        <div className="relative">
            <div className="bg-white aside aside_right overflow-hidden flex flex-col aside_visible !px-0">
                <div className="aside-header d-flex align-items-center !mx-0">
                    <h3 className="text-uppercase fs-6 mb-0">{title}</h3>
                    <button
                        onClick={onClose}
                        className="btn-close-lg js-close-aside btn-close-aside ms-auto"
                    />
                </div>
                {children}
            </div>
            <div className="page-overlay page-overlay_visible" onClick={onClose}></div>
        </div>
    )
}

export function MenuModalPanel({ isOpen, title, onClose, children }: { isOpen: boolean, title: string | ReactNode, onClose: () => void, children?: ReactNode }) {

    useEffect(() => {
        const bodyElement = document.getElementsByTagName("body");

        if (isOpen) {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.add('modal-open');
                bodyElement[0].classList.add('overflow-hidden');
            }
        } else {
            if (bodyElement.length > 0) {
                bodyElement[0].classList.remove('modal-open');
                bodyElement[0].classList.remove('overflow-hidden');
            }
        }
    }, [isOpen]);

    if (!isOpen) {
        return undefined;
    }

    return (
        <div className="relative">
            <div className="bg-white fixed top-0 w-[20rem] max-w-full h-screen transition-all duration-300 ease-[cubic-bezier(0.39, 0.575, 0.565, 1)] z-[9999] aside_left overflow-hidden flex flex-col aside_visible !px-0">
                <div className="p-2 d-flex align-items-center !mx-0 justify-center">
                    <h3 className="text-uppercase mb-0">{title}</h3>
                </div>
                {children}
            </div>
            <div className="page-overlay page-overlay_visible" onClick={onClose}></div>
        </div>
    )
}

