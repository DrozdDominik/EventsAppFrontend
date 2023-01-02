import React from 'react';
import { ReactComponent as Eye } from '../../../icons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../icons/eye-slash.svg';

interface Props {
  passwordVisible: boolean;
  togglePassword: () => void;
}

export const ShowPassword = (props: Props) => {
  return (
    <i onClick={props.togglePassword}>
      {props.passwordVisible ? <Eye /> : <EyeSlash />}
    </i>
  );
};
