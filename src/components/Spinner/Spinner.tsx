import React, {CSSProperties} from "react";
import {ClipLoader} from "react-spinners";

interface Props {
    isLoading: boolean;
}

const override: CSSProperties = {
    display: "block",
    margin: "200px auto",
    borderColor: "royalblue",
};

export const Spinner = (props: Props) => {
    return (
        <>
            <ClipLoader loading={props.isLoading} cssOverride={override} size={400} />
        </>
    )
}