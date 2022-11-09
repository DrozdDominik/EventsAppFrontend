import React from "react";
import {FormType} from "../../pages/AuthPage/Auth";
import classes from './Button.module.css'

interface Props {
    type: FormType
    click: () => void
}

export const Button = (props: Props) => {
    return (
        <button className={classes.Btn} onClick={props.click}>{props.type === FormType.Register ? "Rejestracja" : "Logowanie"}</button>
    )
}