import React from 'react';

import classes from './LoggedNavigation.module.css';
import {useDispatch} from "react-redux";
import { authActions } from '../../store/auth-slice'
import {apiUrl} from "../../config/api";
import {NotificationStatus, uiAction} from "../../store/ui-slice";

export const LoggedNavigation = () => {
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
     <header>
         <nav>
             <ul className={classes.menuList}>
                <li><button className={classes.logoutBtn} onClick={logout}>Wyloguj</button></li>
             </ul>
         </nav>
     </header>
 )
}
