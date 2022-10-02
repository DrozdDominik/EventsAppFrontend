import React from 'react'
import {Header} from "../../layout/Header/Header";
import {RegisterForm} from "./RegisterForm";

export const RegisterPage = () => {
    return <>
        <Header name={'rejestracja'} />
        <RegisterForm />
    </>
}