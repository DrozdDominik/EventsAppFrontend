import React, { useState } from 'react';
import { AuthBtn } from '../../components/common/Btns/Auth/AuthBtn';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import classes from './Auth.module.css';
import { useLoaderData, useNavigate } from 'react-router-dom';

export enum FormType {
  'Register',
  'Login',
}

export const Auth = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [formType, setFormType] = useState<FormType>(FormType.Register);

  if (data) {
    navigate('/events');
  }
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
