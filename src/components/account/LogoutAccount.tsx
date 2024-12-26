"use client"
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LogoutAccount() {

    return (
        <div className="row mt-10 container-fit">
            <div className="col-md-6 mb-8">
                <h4 className="font-semibold text-lg pb-5">Login</h4>
                <LoginForm />
            </div>
            <div className="col-md-6">
                <h4 className="font-semibold text-lg pb-5">Register</h4>
                <RegisterForm />
            </div>
        </div>
    )
}