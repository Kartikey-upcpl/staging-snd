'use client';

import React, { useState, useTransition, useEffect, ReactNode } from "react";
import { useFormState } from "react-dom";

import { addReview } from "./actions";

import Loading from "@/components/ui/Loading";

export default function BlogReviewForm({ header, postId, parentId = 0, onCallback }: { header?: ReactNode, postId: number, parentId?: number, onCallback?: () => void }) {
    const [content, setContent] = useState("");

    const [isPending, startTransition] = useTransition();
    const [state, action] = useFormState(addReview, undefined);

    useEffect(() => {
        if (!!state?.data) {
            setContent("");
            if (state.data.status === "approved") {
                if (onCallback) {
                    onCallback();   
                }
            }
        }
    }, [state]);

    const onSubmit = () => {
        startTransition(async () => {
            await action({
                content: content,
                post: postId,
                parent: parentId,
            });
        });
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
            }}
            className="bg-light p-4"
        >
            {header}
            <div className="mb-4">
                <textarea
                    className="form-control form-control_gray"
                    placeholder="Comment *"
                    cols={30}
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {!!state?.errors?.content && (
                    <p className="mt-1 text-red-500 text-xs">{state!.errors!.content}</p>
                )}
            </div>
            <div className="form-action">
                {state?.message && (<p className="text-xs text-red-500 mt-1" dangerouslySetInnerHTML={{ __html: state.message }} />)}
                {state?.data && state.data.status !== "approved" && (<p className="text-xs text-green-500 mt-1" >Your reply is pending to approved</p>)}
                <button type="submit" className="btn btn-primary">
                    {isPending ? <Loading className="spinner-border-sm text-white" /> : "Submit"}
                </button>
            </div>
        </form>
    )
}