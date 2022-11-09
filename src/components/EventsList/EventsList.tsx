import React from "react";
import { MainEventData } from "types";
import {SingleEvent} from "../Event/SingleEvent";

interface Props {
    events: MainEventData[],
}

export const EventsList = (props: Props) => {
    console.log('eventList prop', props.events)
    return (
        <>
            { props.events.map(event => <SingleEvent key={event.id} event={event} />) }
        </>
    )
}