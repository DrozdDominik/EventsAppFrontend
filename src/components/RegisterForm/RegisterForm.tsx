import React, {ChangeEvent, FormEvent, useState} from "react";
import {apiUrl} from "../../config/api";
import {NotificationStatus, uiAction} from "../../store/ui-slice";
import {useDispatch} from "react-redux";
import classes from "../../layouts/form/form.module.css";
import {CancelBtn} from "../common/Btns/Cancel/CancelBtn";

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
                status: NotificationStatus.info,
                title: 'Niepoprawne hasło!',
                message: 'Hasło musi zawierać od 7 do 15 znaków w tym przynajmniej jedną literą, cyfrę i znak specjalny',
                duration: 6000,
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

    const cancel = () => {
        setUser({
            name: '',
            email: '',
            password: '',
        })
    }

    return (
        <div className={classes.formContainer}>
            <h1>Rejestracja</h1>
            <form onSubmit={submit} className={"registerForm"}>
                <fieldset>
                    <legend>Podaj dane</legend>
                    <label>
                        <span>Użytkownik</span>
                        <input type="text" name="name" value={user.name} onChange={change} required={true}/>
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="email" name="email" value={user.email} onChange={change} required={true}/>
                    </label>
                    <label>
                        <span>Hasło</span>
                        <input type="password" name="password" value={user.password} onChange={change} required={true}/>
                    </label>
                    <div className={classes.btnsContainer}>
                        <CancelBtn handleCancel={cancel}/>
                        <button className={classes.submit} type="submit">
                            Zarejestruj!
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}