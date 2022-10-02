import React, {ChangeEvent, FormEvent, useState} from "react";
import {apiUrl} from "../../config/api";

export const RegisterForm = () => {

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
        console.log(result)
    }


    return (
        <>
            <form onSubmit={submit}>
                <label>
                    Login
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