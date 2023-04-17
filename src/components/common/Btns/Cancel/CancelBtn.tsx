import React from 'react';
import classes from './CancelBtn.module.css';

interface Props {
  handleCancel: () => void;
  isSubmitting: boolean;
}

export const CancelBtn = (props: Props) => {
  return (
    <>
      <button
        type={'button'}
        className={classes.cancel}
        onClick={props.handleCancel}
        disabled={props.isSubmitting}
      >
        Anuluj
      </button>
    </>
  );
};
