import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { UserRole } from 'types';
import { getUserRole } from '../../utils/get-role';
import { authActions } from '../../store/auth-slice';
import { EventAddForm } from '../../components/EventAddForm/EventAddForm';
import { Notification } from '../../components/Notification/Notification';
import { Spinner } from '../../components/Spinner/Spinner';

export const AddEventPage = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const notification = useSelector((state: RootState) => state.ui.notification);

  useEffect(() => {
    (async () => {
      let userRole = role;
      if (!role) {
        userRole = await getUserRole();
        if (userRole) {
          dispatch(authActions.login(userRole));
        } else {
          dispatch(
            uiAction.showNotification({
              status: NotificationStatus.info,
              title: 'Wymagane logowanie!',
              message: '',
              duration: 4000,
            }),
          );

          navigate('/');
          return;
        }
      }

      if (userRole !== UserRole.Editor) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.info,
            title: 'Brak uprawnień',
            message: 'Nie masz uprawnień aby wejść na stronę!',
            duration: 4000,
          }),
        );

        navigate('/');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <>
      <EventAddForm />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </>
  );
};
