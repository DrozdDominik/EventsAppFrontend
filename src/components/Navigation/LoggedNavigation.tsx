import React from 'react';
import classes from './LoggedNavigation.module.css';
import {useDispatch, useSelector} from "react-redux";
import { authActions } from '../../store/auth-slice'
import {apiUrl} from "../../config/api";
import {NotificationStatus, uiAction} from "../../store/ui-slice";
import {RootState} from "../../store";
import { UserRole } from 'types'
import {NavigateBtn} from "../common/NavigateBtn";

export const LoggedNavigation = () => {
    const { role } = useSelector((state: RootState) => state.auth )
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
     <header>
         <nav>
             <ul className={classes.menuList}>
                <li><button className={classes.logoutBtn} onClick={logout}>Wyloguj</button></li>
                 {role === UserRole.Editor && <li><NavigateBtn url={'/event/add'} text={'Dodaj wydarzenie'} /> </li>}
             </ul>
         </nav>
     </header>
 )
}
