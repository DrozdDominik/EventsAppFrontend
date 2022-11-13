import React from "react";
import {NavigateBtn} from "../../components/common/NavigateBtn";

export const NotFoundPage = () => {
    return (
        <>
            <h3>Strona nie istnieje</h3>
            <NavigateBtn url={'/'} text={"Strona głowna"} />
        </>
    )
}