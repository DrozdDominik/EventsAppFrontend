import React, {SyntheticEvent, useEffect, useState} from "react";
import {NewEventData} from "types";
import classes from "./EventAddForm.module.css";
import {NavigateBtn} from "../common/Btns/NavigateBtn";
import {useDispatch, useSelector} from "react-redux";
import {NotificationStatus, uiAction} from "../../store/ui-slice";
import {RootState} from "../../store";
import { EventFormData } from "src/types";
import {validateData} from "../../utils/validate-event-data";
import {fetchPost} from "../../utils/fetch-post";
import {ErrorsScreen} from "../ErrorsScreen/ErrorsScreen";
import {addProtocol} from "../../utils/addProtocol";

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

    const [eventData, setEventData] = useState<EventFormData>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useDispatch();
    const notification = useSelector((state: RootState) => state.ui.notification);

    const updateForm = (key: string, value: string | number) => {
        setEventData(eventData => ({
            ...eventData,
            [key]: value,
        }));
    };

    const sendData = async (data: NewEventData): Promise<boolean> => {
        const result = await fetchPost('api/event', data);

        return result.status === 201;
    }

    const saveEvent = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrors([]);

        const validationResult = await validateData(eventData);

        if(Array.isArray(validationResult)) {
            setErrors(validationResult);
            dispatch(uiAction.showNotification({
                status: NotificationStatus.error,
                title: "Błąd",
                message: "Podano błędne dane!",
                duration: 4000,
            }));
            setLoading(false);
            return;
        }

        const {lat, lon} = validationResult;

        const eventToSave: NewEventData = {
            name: eventData.name,
            description: eventData.description,
            estimatedTime: Number(eventData.time),
            link: eventData.link !== '' ? addProtocol(eventData.link) : null,
            lat,
            lon,
        }

        if(!await sendData(eventToSave)) {
            dispatch(uiAction.showNotification({
                status: NotificationStatus.error,
                title: "Błąd",
                message: "Nie udało się dodać wydarzenia!",
                duration: 3000,
            }));
        } else {
            dispatch(uiAction.showNotification({
                status: NotificationStatus.success,
                title: "Dodano wydarzenie",
                message: "",
                duration: 3500,
            }));
            setEventData(initialState);
        }

        setLoading(false);
    }

    useEffect(() => {
        if(notification) {
            setTimeout(() => {
                dispatch(uiAction.clearNotification())
            }, notification.duration)
        }
    }, [notification])

    if (loading) {
        return <h2>Trwa dodawanie wydarzenia...</h2>;
    }

    return (
        <>
            {errors.length !== 0 && <ErrorsScreen errors={errors} />}
            <div className={classes.card}>
                <div className={classes.card_info}>
                    <h1 className={classes.card_header}>Dodaj wydarzenie</h1>
                </div>
                <form className={classes.add_event_form} onSubmit={saveEvent}>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="name" value={eventData.name} onChange={e => updateForm('name', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Nazwa wydarzenia</label>
                    </div>
                    <div className={classes.input}>
                        <textarea className={classes.input_field} name="description" value={eventData.description} onChange={e => updateForm('description', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Opis</label>
                    </div>
                    <div className={classes.input}>
                        <input type="number" className={classes.input_field} name="time" value={eventData.time} onChange={e => updateForm('time', e.target.value)} min={1} step={1} required={true}/>
                        <label className={classes.input_label}>Planowany czas trwania (minuty)</label>
                    </div>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="link" value={eventData.link} onChange={e => updateForm('link', e.target.value)}/>
                        <label className={classes.input_label}>Link do strony wydarzenia (opcjonalne)</label>
                    </div>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="country" value={eventData.country} onChange={e => updateForm('country', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Kraj</label>
                        </div>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="city" value={eventData.city} onChange={e => updateForm('city', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Miasto</label>
                    </div>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="street" value={eventData.street} onChange={e => updateForm('street', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Ulica</label>
                    </div>
                    <div className={classes.input}>
                        <input type="text" className={classes.input_field} name="number" value={eventData.number} onChange={e => updateForm('number', e.target.value)} required={true}/>
                        <label className={classes.input_label}>Numer budynku</label>
                    </div>
                    <div className={classes.div_submit} >
                        <button className={classes.btn_submit} type="submit">Dodaj!</button>
                        <NavigateBtn url={'/'} text={'Powrót'} />
                    </div>
                </form>
                {/*{errors.length !== 0 && <div className={classes.errors_container}><ul className={classes.errors_list}>{errors.map((error, index) => <li key={index} className={classes.error}>{error}</li>)}</ul></div>}*/}
            </div>
        </>
    )
}