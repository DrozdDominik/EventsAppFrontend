import React, { useEffect, useState } from 'react';
import { MainEventData } from 'types';
import { EventsList } from '../../components/EventsList/EventsList';
import { Map } from '../../components/Map/Map';
import classes from './EventsPage.module.css';
import { Spinner } from '../../components/Spinner/Spinner';
import {
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-get';
import { getRole } from '../../utils/auth';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';
import { getCurrentCategories } from '../../utils/getCurrentCategories';

export const EventsPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isLoading = navigation.state === 'loading';
  const { events } = useLoaderData() as { events: MainEventData[] };
  const permissions = searchParams.get('permissions');
  const currentEventsCategories = getCurrentCategories(events);

  const [eventsToShow, setEventsToShow] = useState(events);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEventsToShow(
      events.filter(event => event.category === e.currentTarget.innerText),
    );
  };

  useEffect(() => {
    if (permissions === 'false') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
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
      <header className={classes.categories}>
        <button
          type="button"
          className={classes.category}
          onClick={() => setEventsToShow(events)}
        >
          Wszystkie
        </button>
        {currentEventsCategories.map(category => (
          <button
            type="button"
            key={category}
            className={classes.category}
            onClick={handleClick}
          >
            {category}
          </button>
        ))}
      </header>
      <main className={classes.main}>
        <EventsList events={eventsToShow} />
        <Map events={eventsToShow} />
      </main>
    </>
  );
};

export const eventsLoader: LoaderFunction = async () => {
  const path = `events`;
  const role = getRole();

  if (!role) {
    return redirect(`/?path=${path}&logged=false`);
  }

  const data = await fetchGet('api/event');

  if (!data.ok) {
    if (data.status === 401) {
      cleanUpLocalStorage();
      return redirect(`/?path=${path}&logged=false`);
    }

    throw json(
      { message: 'Błąd podczas pobierania wydarzeń' },
      { status: 500 },
    );
  }
  return data;
};
