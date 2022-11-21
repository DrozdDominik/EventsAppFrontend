import React from "react";
import {NavigateBtn} from "../../components/common/Btns/NavigateBtn";

export const NotFoundPage = () => {
    return (
        <>
            <h3>Strona nie istnieje</h3>
            <NavigateBtn url={'/'} text={"Strona głowna"} />
        </>
    )
}