import React, {useState} from "react";
import {AuthButton} from "../../components/common/Btns/AuthButton";
import {LoginForm} from "../../components/LoginForm/LoginForm";
import {RegisterForm} from "../../components/RegisterForm/RegisterForm";

export enum FormType {
    "Register",
    'Login',
}

export const Auth = () => {
    const [formType, setFormType] = useState<FormType>(FormType.Register)

    const handleChangeFormType = () => {
        const type = formType === FormType.Register ? FormType.Login : FormType.Register
        setFormType(type)
    }

    return (
        <>
            <AuthButton type={formType} click={handleChangeFormType}/>
            {formType === FormType.Register ? <LoginForm /> : <RegisterForm changeFormType={handleChangeFormType}/>}
        </>
    )
}