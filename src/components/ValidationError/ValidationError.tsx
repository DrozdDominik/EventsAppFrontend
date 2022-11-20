import React from "react";
import classes from "./ValidationError.module.css"

interface Props {
    error: string;
}

export const ValidationError = (props: Props) => {
    return (
        <>
            <div className={classes.error}>
                <p>{props.error}</p>
            </div>
        </>
    )
}