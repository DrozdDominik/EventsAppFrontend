import React from 'react';
import { LoaderFunction, Outlet, redirect } from 'react-router-dom';
import classes from './User.module.css';
import { getRole } from '../../utils/auth';

export const UserLayout = () => {
  return (
    <div className={classes.container}>
      <Outlet />
    </div>
  );
};

export const userAuthLoader: LoaderFunction = ({ request }) => {
  const role = getRole();
  const url = new URL(request.url);
  const path = encodeURIComponent(url.pathname);

  if (!role) {
    return redirect(`/?path=${path}&logged=false`);
  }
  return null;
};
