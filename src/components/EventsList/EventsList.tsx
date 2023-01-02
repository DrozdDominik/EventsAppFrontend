import React from 'react';
import { MainEventData } from 'types';
import { EventCard } from '../EventCard/EventCard';
import classes from './EventList.module.css';

interface Props {
  events: MainEventData[];
}

export const EventsList = (props: Props) => {
  return (
    <div className={classes.listContainer}>
      <ul className={classes.events}>
        {props.events.map(event => (
          <li key={event.id}>
            <EventCard event={event} />{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};
