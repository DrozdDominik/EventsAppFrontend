import React from 'react';
import { MainEventData } from 'types';
import { EventsList } from '../../components/EventsList/EventsList';
import { Map } from '../../components/Map/Map';
import classes from './EventsPage.module.css';
import { Spinner } from '../../components/Spinner/Spinner';
import { json, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-get';
import { getRole } from '../../utils/auth';

export const EventsPage = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const { events } = useLoaderData() as { events: MainEventData[] };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <main className={classes.main}>
      <EventsList events={events} />
      <Map events={events} />
    </main>
  );
};

export const eventsLoader = async () => {
  const role = getRole();

  if (!role) {
    return redirect('/auth');
  }

  const data = await fetchGet('api/event');

  if (!data.ok) {
    if (data.status === 401) {
      return redirect('/auth');
    }
    throw json({ message: 'Wystąpił błąd!' }, { status: 500 });
  }
  return data;
};
