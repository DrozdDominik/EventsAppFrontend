import React, {useEffect, useState} from "react";
import {MainEventData} from 'types'
import {apiUrl} from "../../config/api";
import {EventsList} from "../../components/EventsList/EventsList";
import {Map} from "../../components/Map/Map"
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import classes from './EventPage.module.css'
import {LoggedNavigation} from "../../components/Navigation/LoggedNavigation";

const getEvents = async (): Promise<MainEventData[] | false> => {

    const data = await fetch(`${apiUrl}/api/event`,
        {method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },})

    if(data.status === 401) {
        return false;
    }

    const result = await data.json() as {events: MainEventData[]}

    return result.events;
}

export const EventsPage = () => {
    const { role } = useSelector((state: RootState) => state.auth);
    const [events, setEvents] = useState<MainEventData[]>([]);

    useEffect(() => {

        if(!role) {
        return;
        }

        (async () => {
            const result = await getEvents()
            if(result) {
                setEvents(result)
            }
        })()

    }, [role])

    return (
        <>
            <div className={classes.layout}>
                <LoggedNavigation />
                <main className={classes.main}>
                    <EventsList events={events}/>
                    <Map events={events}/>
                </main>
            </div>
        </>
    );
}
