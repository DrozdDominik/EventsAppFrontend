import React from "react";
import {FormType} from "../../pages/Auth/Auth";
import classes from './AuthButton.module.css'

interface Props {
    type: FormType
    click: () => void
}

export const AuthButton = (props: Props) => {
    return (
        <button className={classes.Btn} onClick={props.click}>{props.type === FormType.Register ? "Rejestracja" : "Logowanie"}</button>
    )
}