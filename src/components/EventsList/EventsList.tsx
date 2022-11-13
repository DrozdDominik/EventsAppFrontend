import React from "react";
import { MainEventData } from "types";
import {EventCard} from "../Event/EventCard";
import classes from "./EventList.module.css";

interface Props {
    events: MainEventData[],
}

export const EventsList = (props: Props) => {
    console.log('eventList prop', props.events)
    return (
        <ul className={classes.events}>
            { props.events.map(event => <li key={event.id}><EventCard event={event} /> </li>) }
        </ul>
    )
}