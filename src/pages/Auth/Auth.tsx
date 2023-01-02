import React, { useState } from 'react';
import { AuthBtn } from '../../components/common/Btns/Auth/AuthBtn';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import classes from './Auth.module.css';

export enum FormType {
  'Register',
  'Login',
}

export const Auth = () => {
  const [formType, setFormType] = useState<FormType>(FormType.Register);

  const handleChangeFormType = () => {
    const type =
      formType === FormType.Register ? FormType.Login : FormType.Register;
    setFormType(type);
  };

  return (
    <div className={classes.authContainer}>
      <nav>
        <AuthBtn type={formType} click={handleChangeFormType} />
      </nav>
      {formType === FormType.Register ? (
        <LoginForm />
      ) : (
        <RegisterForm changeFormType={handleChangeFormType} />
      )}
    </div>
  );
};
