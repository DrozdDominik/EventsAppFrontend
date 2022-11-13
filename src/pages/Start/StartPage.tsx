import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {roleActions} from "../../store/role-slice";
import {authActions} from "../../store/auth-slice";
import {apiUrl} from "../../config/api";
import { UserRole } from "types";
import {EventsPage} from "../Events/EventsPage";
import {Auth} from "../Auth/Auth";
import {Notification} from "../../components/Notification/Notification";
import {uiAction} from "../../store/ui-slice";

export const StartPage = () => {
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const { role } = useSelector((state: RootState) => state.role);
    const notification = useSelector((state: RootState) => state.ui.notification);
    const dispatch = useDispatch();

    const getUserRole = async (): Promise<UserRole | false> => {
        const result = await fetch(`${apiUrl}/user/role`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if(result.status === 401) {
            return false;
        }

        const data = await result.json() as {role: UserRole}

        return data.role;
    }

    useEffect(() => {
        if(role) {
            return;
        }
        (async () => {
            const role = await getUserRole();
            if(role) {
                dispatch(roleActions.setRole(role))
                dispatch(authActions.login())
            }
        })()

    }, [])

    useEffect(() => {
        if(notification) {
            setTimeout(() => {
                dispatch(uiAction.clearNotification())
            }, notification.duration)
        }
    }, [notification])

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            { isLogged ? <EventsPage /> : <Auth /> }
        </>
    )
}