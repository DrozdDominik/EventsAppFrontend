import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './User.module.css';

export const UserLayout = () => {
  return (
    <div className={classes.container}>
      <Outlet />
    </div>
  );
};
