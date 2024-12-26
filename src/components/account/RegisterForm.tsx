'use client';

import classnames from "clsx";
import React, { useCallback, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { registerAction } from "./actions";
import Submit from "@/components/button/Submit";

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    // const toggleObscurePassword = useCallback(() => setObscurePassword(obscurePassword => !obscurePassword), []);

    const [state, action] = useFormState(registerAction, undefined);
    return (
        <form
            onSubmit={(event) => {
                const formData = new FormData(event.currentTarget);
                event.preventDefault();
                startTransition(async () => {
                    await action(formData);
                });
            }}
        >
            <div className="mb-3">
                <div className="form-floating">
                    <input
                        type="text"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.user_login
                            }
                        )}
                        placeholder="First name"
                        name="user_login"
                        id="user_login"
                    />
                    <label htmlFor="user_login">
                        Username <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.user_login && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.user_login}</p>
                )}
            </div>
            <div className="mb-3">
                <div className="form-floating">
                    <input
                        type="text"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.first_name
                            }
                        )}
                        placeholder="First name"
                        name="first_name"
                        id="register-firstname"
                    />
                    <label htmlFor="register-firstname">
                        First name <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.first_name && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.first_name}</p>
                )}
            </div>
            <div className="my-3">
                <div className="form-floating">
                    <input
                        type="text"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.last_name
                            }
                        )}
                        placeholder="Last name"
                        name="last_name"
                        id="register-lastname"
                    />
                    <label htmlFor="register-lastname">
                        Last name <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.last_name && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.last_name}</p>
                )}
            </div>
            {/* <div className="my-3">
                <div className="form-floating">
                    <input
                        type="tel"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.phone
                            }
                        )}
                        placeholder="type 10 digits phone number"
                        name="register-phone"
                    />
                    <label htmlFor="register-phone">
                        Phone <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
            </div> */}
            <div className="my-3">
                <div className="form-floating">
                    <input
                        type="text"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.email
                            }
                        )}
                        placeholder="Email"
                        name="email"
                        id="register-email"
                    />
                    <label htmlFor="register-email">
                        Email <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.email && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.email}</p>
                )}
            </div>
            <div className="my-3">
                <div className="form-floating">
                    <input
                        type="password"
                        className={classnames(
                            "form-control",
                            {
                                "is-invalid": state?.errors?.password
                            }
                        )}
                        placeholder="Password"
                        name="password"
                        id="register-password"
                        autoComplete="off"
                    />
                    <label htmlFor="register-password">
                        Password <b className='text-pink-600'>*</b>
                    </label>
                </div>
                {state?.errors?.password && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.password}</p>
                )}
            </div>
            <div className="form-check">
                <input
                    className="form-check-input form-check-input_fill"
                    type="checkbox"
                    name="agree_privacy_term"
                />
                <label htmlFor="register-send-info" className="form-check-label text-secondary">
                    Term and conditions
                </label>
                {state?.errors?.agree_privacy_term && (
                    <p className="text-xs text-red-500 mt-1">{state?.errors?.agree_privacy_term}</p>
                )}
            </div>
            <p className="mb-3 text-secondary">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
            </p>
            {state?.message && (<p className="text-xs text-red-500 mt-1" dangerouslySetInnerHTML={{ __html: state.message }} />)}
            <Submit isPending={isPending} label="Register" />
        </form>
    )
}