import React from "react";
import { MainEventData } from "types";

interface Props {
    event: MainEventData
}

export const SingleEvent = (props: Props) => {
    return (
        <div>
            <h3>{props.event.name}</h3>
            <p>{props.event.description}</p>
            <p>Przewidywany czas trwania: <span>{props.event.estimatedTime} minut</span></p>
        </div>
    )
}