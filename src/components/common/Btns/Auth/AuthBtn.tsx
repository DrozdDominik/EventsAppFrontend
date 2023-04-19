import React from 'react';
import classes from './AuthBtn.module.css';
import { Link } from 'react-router-dom';

interface Props {
  register: boolean;
}

export const AuthBtn = (props: Props) => {
  return (
    <Link
      to={props.register ? '/' : '/?mode=register'}
      className={classes.auth}
    >
      {props.register ? 'Logowanie' : 'Rejestracja'}
    </Link>
  );
};
