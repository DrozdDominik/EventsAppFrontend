import React from "react";
import classes from "./LogoutBtn.module.css"
import {apiUrl} from "../../../../config/api";
import {authActions} from "../../../../store/auth-slice";
import {NotificationStatus, uiAction} from "../../../../store/ui-slice";
import {useDispatch} from "react-redux";

export const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        const result = await fetch(`${apiUrl}/user/logout`, {method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if(result.status === 200) {
            dispatch(authActions.logout())
            dispatch(uiAction.showNotification({
                status: NotificationStatus.info,
                title: 'Poprawne wylogowanie',
                message: 'Do zobaczenia!',
                duration: 3500,
            }))
        } else {
            dispatch((uiAction.showNotification({
                status: NotificationStatus.error,
                title: 'Błąd',
                message: 'Nieudane wylogowanie!',
            })))
        }
}
    return (
        <button className={classes.logout} onClick={logout}>Wyloguj</button>
    )
}