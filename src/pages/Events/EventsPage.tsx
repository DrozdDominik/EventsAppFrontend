import React, {useEffect, useState} from "react";
import {MainEventData} from 'types'
import {apiUrl} from "../../config/api";
import {EventsList} from "../../components/EventsList/EventsList";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

import {LoggedNavigation} from "../../components/Navigation/LoggedNavigation";


export const EventsPage = () => {
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const { role } = useSelector((state: RootState) => state.role);
    const [events, setEvents] = useState<MainEventData[]>([]);

    const getEvents = async (): Promise<MainEventData[] | false> => {

        const data = await fetch(`${apiUrl}/api/event`, {method: "GET",
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

    }, [isLogged])

    return (
        <>
            <LoggedNavigation />
            <EventsList events={events}/>
        </>
    );
}
