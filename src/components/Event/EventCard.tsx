import React from "react";
import { MainEventData } from "types";
import {NavigateBtn} from "../common/Btns/Navigate/NavigateBtn";
import classes from "./EventCard.module.css";

interface Props {
    event: MainEventData
}

export const EventCard = (props: Props) => {
    return (
        <div className={classes.cardContainer}>
            <h3>{props.event.name}</h3>
            <p>{props.event.description}</p>
            <NavigateBtn url={`/event/${props.event.id}`} text={'Więcej informacji'}/>
        </div>
    )
}