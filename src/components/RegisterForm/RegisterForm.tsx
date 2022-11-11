import React, {ChangeEvent, FormEvent, useState} from "react";
import {apiUrl} from "../../config/api";
import {NotificationStatus, uiAction} from "../../store/ui-slice";
import './RegisterForm.css'
import {useDispatch} from "react-redux";

interface Props {
    changeFormType: () => void
}

export const RegisterForm = (props: Props) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const change = (e: ChangeEvent<HTMLInputElement>) => (
        setUser(person => (
            {
                ...person,
                [e.target.name]: e.target.value,
            }
        ))
    )

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetch(`${apiUrl}/user/`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if(result.status === 201) {
            dispatch(uiAction.showNotification({
                status: NotificationStatus.success,
                title: 'Rejestracja powiodła się!',
                message: 'Możesz już się zalogować',
                duration: 4000,
            }))
            props.changeFormType();
        } else if(result.status === 400) {
            dispatch((uiAction.showNotification({
                status: NotificationStatus.error,
                title: 'Błąd',
                message: 'Podany email jest już zajęty!',
                duration: 5000,
            })))
        } else if (result.status === 422) {
            dispatch((uiAction.showNotification({
                status: NotificationStatus.error,
                title: 'Błąd',
                message: 'Podano nieprawidłowe dane!',
                duration: 2500,
            })))
        } else {
            dispatch((uiAction.showNotification({
                status: NotificationStatus.error,
                title: 'Błąd',
                message: 'Serwis czasowo niedostępny!',
                duration: 4000,
            })))
        }
    }


    return (
        <>
            <h1>Rejestracja</h1>
            <form onSubmit={submit} className={"registerForm"}>
                <label>
                    Nazwa użytkownika
                    <input type="text" name="name" value={user.name} onChange={change}/>
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={user.email} onChange={change}/>
                </label>
                <label>
                    Hasło
                    <input type="password" name="password" value={user.password} onChange={change}/>
                </label>
                <button type="submit">Zarejestruj!</button>
            </form>
        </>
    )
}