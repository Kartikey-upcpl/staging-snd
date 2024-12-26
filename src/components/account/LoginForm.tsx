'use client';

import { useFormState } from "react-dom";
import classnames from "clsx";
import Link from "next/link";
import React, { useCallback, useState, useTransition } from "react";
import { loginAction } from './actions';
import Submit from "@/components/button/Submit";
import { OtpModal } from "../ui/otpModal";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginWrapper from "./GoogleLoginWrapper";

function EyeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );
}

function EyeSlashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );
}

export default function LoginForm() {
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [obscurePassword, setObscurePassword] = useState(true);

    const toggleObscurePassword = useCallback(() => setObscurePassword(obscurePassword => !obscurePassword), []);
    const toggleIsRemember = useCallback(() => setIsRemember(isRemember => !isRemember), []);

    const [state, action] = useFormState(loginAction, undefined);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLoginSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse?.credential;
        if (!idToken) {
            console.error("Google ID Token is missing");
            return;
        }

        const formData = new FormData();
        formData.append('type', 'google');
        formData.append('idToken', idToken);

        try {
            const result = await loginAction({}, formData);
            if (result?.errors) {
                console.error("Validation errors:", result.errors);
            } else if (result?.message) {
                console.error("Google Login failed:", result.message);
            } else {
                console.log("Google Login successful!");
            }
        } catch (error) {
            console.error("Error during Google Login:", error);
        }
    };

    const handleLoginError = () => {
        console.error("Google Login failed");
    };

    return (
        <div className="space-y-2">
            <form
                onSubmit={(event) => {
                    const formData = new FormData(event.currentTarget);
                    formData.append('type', 'password');
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
                                    "is-invalid": state?.errors?.username
                                }
                            )}
                            placeholder="Username or email address"
                            name="username"
                        />
                        <label htmlFor="login-username">
                            Username or email address <b className='text-pink-600'>*</b>
                        </label>
                    </div>
                    {state?.errors?.username && (
                        <p className="text-xs text-red-500 mt-1">{state?.errors?.username}</p>
                    )}
                </div>
                <div className="my-3">
                    <div className="form-floating">
                        <input
                            type={obscurePassword ? "password" : "text"}
                            className={classnames(
                                "form-control !pr-14",
                                {
                                    "is-invalid": state?.errors?.password
                                }
                            )}
                            placeholder="Password"
                            name="password"
                        />
                        <label htmlFor="login-password">
                            Password <b className='text-pink-600'>*</b>
                        </label>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleObscurePassword();
                            }}
                            className="absolute top-3 right-2.5 p-2 bg-white hover:!bg-gray-100"
                        >
                            {obscurePassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </button>
                    </div>
                    {state?.errors?.password && (
                        <p className="text-xs text-red-500 mt-1">{state?.errors?.password}</p>
                    )}
                </div>
                <div className="d-flex align-items-center mb-3 pb-2">
                    <div className="form-check mb-0">
                        <input
                            className="form-check-input form-check-input_fill"
                            type="checkbox"
                            checked={isRemember}
                            onChange={() => toggleIsRemember()}
                            name="login-remember"
                        />
                        <label htmlFor="login-remember" className="form-check-label text-secondary">
                            Remember me
                        </label>
                    </div>
                    <Link href="/reset_password" className="btn-text ms-auto">
                        Lost password?
                    </Link>
                </div>
                {state?.message && (<p className="text-xs text-red-500 mt-1" dangerouslySetInnerHTML={{ __html: state.message }} />)}
                <Submit isPending={isPending} label="Log In" />
            </form>
            <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc', margin: 0 }} />
                <p style={{ margin: '0 8px', whiteSpace: 'nowrap', textAlign: 'center' }}>OR</p>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc', margin: 0 }} />
            </div>
            <div className="flex space-x-10" style={{ alignItems: 'center' }}>
                <div className="flex w-1/2">
                    {/* Existing Login Form */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-black text-white p-2 h-[3.75rem] items-center  w-full text-uppercase"
                    >
                        OTP LOGIN
                    </button>

                    <OtpModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                </div>
                <GoogleLoginWrapper onSuccess={handleLoginSuccess} onError={handleLoginError} />

            </div>
        </div>
    )
}



