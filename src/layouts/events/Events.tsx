import React from 'react';
import { Outlet } from 'react-router-dom';
import { LoggedNavigation } from '../../components/Navigation/LoggedNavigation';

export const EventsLayout = () => {
  return (
    <div>
      <LoggedNavigation />
      <Outlet />
    </div>
  );
};
