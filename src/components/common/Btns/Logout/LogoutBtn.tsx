import React from 'react';
import classes from './LogoutBtn.module.css';
import { Form } from 'react-router-dom';

export const LogoutBtn = () => {
  return (
    <Form action="/logout" method="post">
      <button className={classes.logout}>Wyloguj</button>
    </Form>
  );
};
