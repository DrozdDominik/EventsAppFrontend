import React from 'react';
import { FormType } from '../../../../pages/Auth/Auth';
import classes from './AuthBtn.module.css';

interface Props {
  type: FormType;
  click: () => void;
}

export const AuthBtn = (props: Props) => {
  return (
    <button className={classes.auth} onClick={props.click}>
      {props.type === FormType.Register ? 'Rejestracja' : 'Logowanie'}
    </button>
  );
};
