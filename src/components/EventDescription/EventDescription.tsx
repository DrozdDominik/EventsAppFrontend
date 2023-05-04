import React from 'react';
import { EventResponse } from 'types';
import classes from './EventDescription.module.css';

interface Props {
  event: EventResponse;
}

export const EventDescription = (props: Props) => {
  return (
    <div className={classes.container}>
      <header className={classes.cardHeader}>
        <div className={classes.data}>2023-05-28</div>
        <div className={classes.category}>{props.event.category}</div>
      </header>
      <h2 className={classes.title}>{props.event.name}</h2>
      <main className={classes.main}>
        <p className={classes.time}>
          Przewidywany czas trwania:{' '}
          <span className={classes.minutes}>
            {props.event.estimatedTime} minut
          </span>
        </p>
        <p className={classes.description}>{props.event.description}</p>
        {props.event.link && (
          <p className={classes.link}>
            <a href={props.event.link} target="_blank" draggable={false}>
              <i>Strona wydarzenia</i>
            </a>
          </p>
        )}
      </main>
    </div>
  );
};
