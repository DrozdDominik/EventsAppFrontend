import React from "react";
import { EventEntity } from "types";

interface Props {
    event: EventEntity,
}

export const Event = (props: Props) => {
    return (
        <>
            <h2>{props.event.name}</h2>
            <p>Przewidywany czas trwania {props.event.estimatedTime}</p>
            <p>Opis:</p>
            <p>{props.event.description}</p>
            {props.event.link && <p><a href={props.event.link} target="_blank"><i>Strona wydarzenia</i></a></p>}
        </>
    )
}