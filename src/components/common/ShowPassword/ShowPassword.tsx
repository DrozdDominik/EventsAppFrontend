import React from 'react';
import { ReactComponent as Eye } from '../../../icons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../icons/eye-slash.svg';
import classes from './ShowPassword.module.css';

interface Props {
  passwordVisible: boolean;
  togglePassword: () => void;
}

export const ShowPassword = (props: Props) => {
  return (
    <i className={classes.icon} onClick={props.togglePassword}>
      {props.passwordVisible ? <Eye /> : <EyeSlash />}
    </i>
  );
};
