import React, { useEffect } from 'react';
import { EventDescription } from '../../components/EventDescription/EventDescription';
import { EventEntity } from 'types';
import {
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { MapDetailed } from '../../components/Map/MapDetailed';
import { Spinner } from '../../components/Spinner/Spinner';
import classes from './EventPage.module.css';
import { fetchGet } from '../../utils/fetch-get';
import { getRole } from '../../utils/auth';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';

type EventParams = {
  id: string;
};

export const EventPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isLoading = navigation.state === 'loading';
  const { event } = useLoaderData() as { event: EventEntity };
  const permissions = searchParams.get('permissions');

  useEffect(() => {
    if (permissions === 'false') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.info,
          title: 'Brak uprawnień!',
          message: '',
          duration: 3500,
        }),
      );
    }
  }, []);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      {event && (
        <div className={classes.main}>
          <EventDescription event={event} />
          <MapDetailed event={event} />
        </div>
      )}
    </>
  );
};

export const eventLoader: LoaderFunction = async ({ params }) => {
  const role = getRole();
  const eventParams = params as unknown as EventParams;
  const path = encodeURIComponent(`events/${eventParams.id}`);

  if (!role) {
    return redirect(`/?path=${path}&logged=false`);
  }

  const data = await fetchGet(`api/event/${eventParams.id}`);

  if (!data.ok) {
    if (data.status === 401) {
      cleanUpLocalStorage();
      return redirect(`/?path=${path}&logged=false`);
    }

    if (data.status === 400 || data.status === 404) {
      throw json(
        { message: 'Szukane wydarzenie nie istnieje' },
        { status: 400 },
      );
    }

    throw json(
      { message: 'Błąd podczas pobierania wydarzenia' },
      { status: 500 },
    );
  }

  return data;
};
