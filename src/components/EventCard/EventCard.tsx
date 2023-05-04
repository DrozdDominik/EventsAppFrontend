import React from 'react';
import { MainEventData } from 'types';
import { NavigateBtn } from '../common/Btns/Navigate/NavigateBtn';
import classes from './EventCard.module.css';

interface Props {
  event: MainEventData;
}

export const EventCard = (props: Props) => {
  return (
    <div className={classes.cardContainer}>
      <header className={classes.cardHeader}>
        <div className={classes.data}>2023-05-28</div>
        <div className={classes.category}>{props.event.category}</div>
      </header>
      <h3>{props.event.name}</h3>
      <p>{props.event.description}</p>
      <NavigateBtn
        url={`/events/${props.event.id}`}
        text={'Więcej informacji'}
      />
    </div>
  );
};
