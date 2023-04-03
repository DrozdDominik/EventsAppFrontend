import React from 'react';
import { EventDescription } from '../../components/EventDescription/EventDescription';
import { EventEntity } from 'types';
import {
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { MapDetailed } from '../../components/Map/MapDetailed';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { Spinner } from '../../components/Spinner/Spinner';
import classes from './EventPage.module.css';
import { fetchGet } from '../../utils/fetch-get';

type EventParams = {
  id: string;
};

export const EventPage = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { event } = useLoaderData() as { event: EventEntity };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
            <NavigateBtn url={'/events'} text={'Wszystkie wydarzenia'} />
          </div>
        </>
      )}
    </div>
  );
};

export const eventLoader: LoaderFunction = async ({ params }) => {
  const eventParams = params as unknown as EventParams;
  const data = await fetchGet(`api/event/${eventParams.id}`);

  if (!data.ok) {
    if (data.status === 401) {
      return redirect('/auth');
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
