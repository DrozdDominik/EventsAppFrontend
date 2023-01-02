import React, { useEffect, useState } from 'react';
import { EventDescription } from '../../components/EventDescription/EventDescription';
import { EventEntity } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useNavigate, useParams } from 'react-router-dom';
import { MapDetailed } from '../../components/Map/MapDetailed';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { RootState } from '../../store';
import { getUserRole } from '../../utils/get-role';
import { authActions } from '../../store/auth-slice';
import { getEvent } from '../../utils/get-event';
import { Spinner } from '../../components/Spinner/Spinner';
import classes from './EventPage.module.css';

type EventParams = {
  id: string;
};

export const EventPage = () => {
  const params = useParams<EventParams>();
  const id = params.id as string;
  const [event, setEvent] = useState<EventEntity | null>(null);
  const { role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!role) {
        const userRole = await getUserRole();

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
        }
      }

      const data = await getEvent(id);

      if (!data) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.error,
            title: 'Błąd',
            message: 'Wybrane wydarzenie nie istnieje!',
          }),
        );

        navigate('/');
      }

      setEvent(data);
    })();
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={classes.container}>
      {event && (
        <>
          <div className={classes.main}>
            <EventDescription event={event} />
            <MapDetailed event={event} />
          </div>
          <div className={classes.navBtn}>
            <NavigateBtn url={'/'} text={'Wszystkie wydarzenia'} />
          </div>
        </>
      )}
    </div>
  );
};
