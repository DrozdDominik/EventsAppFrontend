import React, {useEffect, useState} from "react";
import {Event} from "../../components/Event/Event"
import {apiUrl} from "../../config/api";
import {EventEntity} from "types";
import {useDispatch} from "react-redux";
import {NotificationStatus, uiAction} from "../../store/ui-slice";
import {useNavigate, useParams} from "react-router-dom";
import {MapDetailed} from "../../components/Map/MapDetailed";
import {NavigateBtn} from "../../components/common/NavigateBtn";

type EventParams = {
    id: string;
}

const getEvent = async (id: string): Promise<EventEntity | null> => {
    const result = await fetch(`${apiUrl}/api/event/${id}`,
        {method: "GET",
             credentials: "include",
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
            },
        });

    if(result.status === 400 || result.status === 404) {
        return null;
    }

    const event  = await result.json() as EventEntity;

    return event;
}

export const EventPage = () => {
    const params  = useParams<EventParams>();
    const id = params.id as string
    const [event, setEvent] = useState<EventEntity|null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getEvent(id);

            if(!data) {
                dispatch(uiAction.showNotification({
                    status: NotificationStatus.error,
                    title: 'Błąd',
                    message: 'Wybrane wydarzenie nie istnieje!',
                }))

                navigate('/');
            }

            setEvent(data);
        })()
    },[])

    return (
        <>
            {event &&
            <div>
            <Event event={event}/>
            <MapDetailed event={event} />
            <NavigateBtn url={'/'} text={'Wszystkie wydarzenia'}/>
            </div>}
        </>
    )
}