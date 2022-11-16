import React, {SyntheticEvent, useState} from "react";
import {NewEventData} from "types";
import {geocode} from "../../utils/geocoding";
import {apiUrl} from "../../config/api";

type EventFormData = {
    name: string;
    description: string;
    time: number;
    link: string;
    country: string;
    city: string;
    street: string;
    number: string;
}

export const EventAddForm = () => {

    const initialState: EventFormData = {
        name: '',
        description: '',
        time: 0,
        link: '',
        country: 'Polska',
        city: '',
        street: '',
        number: '',
    }

    const updateForm = (key: string, value: string | number) => {
        setEventData(eventData => ({
            ...eventData,
            [key]: value,
        }));
    };

    const sendData = async (data: NewEventData): Promise<boolean> => {
        const result = await fetch(`${apiUrl}/api/event`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        return result.status === 201;
    }

    const saveEvent = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            if(!eventData.name || eventData.name.length < 3 || eventData.name.length > 50) {
                //TODO handle wrong name
            }

            if(!eventData.description || eventData.description.length < 10 || eventData.description.length > 500) {
                //TODO handle wrong description
            }

            if(eventData.time <= 0) {
                //TODO handle wrong time
            }

            const address = `${eventData.number} ${eventData.street} ${eventData.city} ${eventData.country}`;
            const data = await geocode(address);

            if(data === null) {
                //TODO handle wrong address
            } else {
                const {lat, lon} = data;

                const eventToSave: NewEventData = {
                    name: eventData.name,
                    description: eventData.description,
                    estimatedTime: Number(eventData.time),
                    link: eventData.link !== '' ? eventData.link : null,
                    lat,
                    lon,
                }

                if(!await sendData(eventToSave)) {
                    //TODO handle insert event error
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const [eventData, setEventData] = useState<EventFormData>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    if (loading) {
        return <h2>Trwa dodawanie wydarzenia...</h2>;
    }

    return (
        <>
            <h1>Dodaj wydarzenie</h1>
            <form onSubmit={saveEvent}>
                <label>
                    Nazwa wydarzenia
                    <input type="text" name="name" value={eventData.name} onChange={e => updateForm('name', e.target.value)}/>
                </label>
                <label>
                    Opis
                    <textarea name="description" value={eventData.description} onChange={e => updateForm('description', e.target.value)}/>
                </label>
                <label>
                    Planowany czas trwania
                    <input type="number" name="time" value={eventData.time} onChange={e => updateForm('time', e.target.value)}/>
                </label>
                <label>
                    Link do strony wydarzenia
                    <input type="text" name="link" value={eventData.link} onChange={e => updateForm('link', e.target.value)}/>
                </label>
                <label>
                    Kraj
                    <input type="text" name="country" value={eventData.country} onChange={e => updateForm('country', e.target.value)}/>
                </label>
                <label>
                    Miasto
                    <input type="text" name="city" value={eventData.city} onChange={e => updateForm('city', e.target.value)}/>
                </label>
                <label>
                    Ulica
                    <input type="text" name="street" value={eventData.street} onChange={e => updateForm('street', e.target.value)}/>
                </label>
                <label>
                    Numer budynku
                    <input type="text" name="number" value={eventData.number} onChange={e => updateForm('number', e.target.value)}/>
                </label>
                <button type="submit">Dodaj!</button>
            </form>
        </>
    )
}