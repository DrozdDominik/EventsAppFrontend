import React, {ChangeEvent, FormEvent, useState} from "react";
import classes from "./LoginForm.module.css";
import {apiUrl} from "../../config/api";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth-slice";
import {UserRole} from "types";
import {NotificationStatus, uiAction} from "../../store/ui-slice";


export const LoginForm = () => {

    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const change = (e: ChangeEvent<HTMLInputElement>) => (
        setUser(user => (
            {
                ...user,
                [e.target.name]: e.target.value,
            }
        ))
    )

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetch(`${apiUrl}/user/login`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })

       if(result.status === 200) {
           const data = await result.json() as {role: UserRole};
           dispatch(authActions.login(data.role))
           dispatch(uiAction.showNotification({
               status: NotificationStatus.success,
               title: 'Udane logowanie!',
               message: 'Witamy w serwisie',
               duration: 3000,
           }))
       } else {
           dispatch(uiAction.showNotification({
               status: NotificationStatus.error,
               title: 'Błąd',
               message: 'Niepoprawne dane logowania!',
               duration: 2500,
           }))
       }

    }

    return (
        <>
            <h1>Logowanie</h1>
            <form className={classes.loginForm} onSubmit={submit}>
                <fieldset>
                    <label>
                        Email
                        <input type="email" name="email" value={user.email} onChange={change}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        Hasło
                        <input type="password" name="password" value={user.password} onChange={change}/>
                    </label>
                </fieldset>
                <button type="button">
                    Anuluj
                </button>
                <button type="submit">
                    Zaloguj
                </button>
            </form>
        </>
    )
}