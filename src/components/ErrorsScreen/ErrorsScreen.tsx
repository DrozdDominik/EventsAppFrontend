import React from 'react';
import { ValidationError } from '../ValidationError/ValidationError';
import classes from './ErrorsScreen.module.css';

interface Props {
  errors: string[];
}

export const ErrorsScreen = (props: Props) => {
  return (
    <>
      <ul className={classes.screen}>
        {props.errors.map((error, index) => (
          <li key={index}>
            <ValidationError error={error} />
          </li>
        ))}
      </ul>
    </>
  );
};
