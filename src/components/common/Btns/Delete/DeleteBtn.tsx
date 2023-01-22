import React from 'react';
import classes from './DeleteBtn.module.css';

interface Props {
  onDelete: () => void;
}

export const DeleteBtn = (props: Props) => {
  return (
    <a className={classes.delete} onClick={props.onDelete}>
      Usuń konto
    </a>
  );
};
