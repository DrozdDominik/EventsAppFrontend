import React from 'react';
import classes from './ChangeBtn.module.css';

interface Props {
  isSubmitting: boolean;
}
export const ChangeBtn = (props: Props) => {
  return (
    <button
      type={'submit'}
      className={classes.change}
      disabled={props.isSubmitting}
    >
      {props.isSubmitting ? 'Edytowanie...' : 'Zmień'}
    </button>
  );
};
