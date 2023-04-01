import React from 'react';
import { Outlet } from 'react-router-dom';
import { LoggedNavigation } from '../../components/Navigation/LoggedNavigation';
import classes from './EventsLayout.module.css';

export const EventsLayout = () => {
  return (
    <div className={classes.layout}>
      <LoggedNavigation />
      <Outlet />
    </div>
  );
};
