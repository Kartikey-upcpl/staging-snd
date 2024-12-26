import { FieldAddress } from "@/lib/wordpress/types";
import React from "react";

export default function BoxViewInput({ field, preField, nextField, children } : { field: FieldAddress, preField: FieldAddress | undefined, nextField: FieldAddress | undefined, children: React.ReactNode }) {
    const position: string = field?.position ?? field.class.includes("form-row-first") ? "form-row-first" : field.class.includes("form-row-last") ? "form-row-last" : "form-row-wide";
    const prePosition: string = preField?.position ?? preField?.class.includes("form-row-first") ? "form-row-first" : preField?.class.includes("form-row-last") ? "form-row-last" : "form-row-wide";
    const nextPosition: string = nextField?.position ?? nextField?.class.includes("form-row-first") ? "form-row-first" : nextField?.class.includes("form-row-last") ? "form-row-last" : "form-row-wide";

    if (position === "form-row-last") {
        if (prePosition !== 'form-row-first') {
            return (
                <>
                    <div className="col-md-6" />,
                    <div className="col-md-6">
                        {children}
                    </div>
                </>
            );
        } else {
            return (
                <div className="col-md-6">
                    {children}
                </div>
            );
        }
    }

    if (position === "form-row-first") {
        if (nextPosition !== 'form-row-last') {
            return (
                <>
                    <div className="col-md-6">
                        {children}
                    </div>,
                    <div className="col-md-6" />,
                </>
            )
        } else {
            return (
                <div className="col-md-6">
                    {children}
                </div>
            );
        }
    }

    return (
        <div className="col-md-12">
            {children}
        </div>
    );
}