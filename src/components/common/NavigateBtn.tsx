import React from "react";
import {Link} from "react-router-dom";

interface Props {
    url: string;
    text: string;
}

export const NavigateBtn = (props: Props) => {
    return (
        <button><Link to={props.url}>{props.text}</Link></button>
    )
}