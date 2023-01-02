import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EventsPage } from '../Events/EventsPage';
import { Auth } from '../Auth/Auth';
import { Notification } from '../../components/Notification/Notification';
import { uiAction } from '../../store/ui-slice';
import { authActions } from '../../store/auth-slice';
import { getUserRole } from '../../utils/get-role';
import { Spinner } from '../../components/Spinner/Spinner';

export const StartPage = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (role) {
      setLoading(false);
      return;
    }

    (async () => {
      const userRole = await getUserRole();
      if (userRole) {
        dispatch(authActions.login(userRole));
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiAction.clearNotification());
      }, notification.duration);
    }
  }, [notification]);

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {!!role ? <EventsPage /> : <Auth />}
    </>
  );
};
