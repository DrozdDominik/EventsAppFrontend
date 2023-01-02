import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigateBtn.module.css';

interface Props {
  url: string;
  text: string;
}

export const NavigateBtn = (props: Props) => {
  return (
    <Link className={classes.link} to={props.url}>
      {props.text}
    </Link>
  );
};
