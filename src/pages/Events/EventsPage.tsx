import React, { useEffect, useState } from 'react';
import { MainEventData } from 'types';
import { EventsList } from '../../components/EventsList/EventsList';
import { Map } from '../../components/Map/Map';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import classes from './EventsPage.module.css';
import { LoggedNavigation } from '../../components/Navigation/LoggedNavigation';
import { Spinner } from '../../components/Spinner/Spinner';
import { getEvents } from '../../utils/get-events';

export const EventsPage = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const [events, setEvents] = useState<MainEventData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!role) {
      return;
    }

    setLoading(true);

    (async () => {
      const result = await getEvents();
      if (result) {
        setLoading(false);
        setEvents(result);
      }
    })();
  }, [role]);

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={classes.layout}>
      <LoggedNavigation />
      <main className={classes.main}>
        <EventsList events={events} />
        <Map events={events} />
      </main>
    </div>
  );
};
