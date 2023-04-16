import React, { useEffect, useState } from 'react';
import { AuthBtn } from '../../components/common/Btns/Auth/AuthBtn';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import classes from './Auth.module.css';
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import { getRole } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { fetchPost } from '../../utils/fetch-post';
import { UserRole } from 'types';

export enum FormType {
  'Register',
  'Login',
}

export const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [formType, setFormType] = useState<FormType>(FormType.Register);

  const urlParams = searchParams.get('path');
  let path = '/';

  if (urlParams) {
    path = decodeURIComponent(urlParams);
  }

  const logged = searchParams.get('logged');
  const permissions = searchParams.get('permissions');
  const deleted = searchParams.get('deleted');

  useEffect(() => {
    if (logged === 'false') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.info,
          title: 'Wymagane logowanie!',
          message: '',
          duration: 3500,
        }),
      );
    }

    if (permissions === 'false') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Brak uprawnień!',
          message: '',
          duration: 3500,
        }),
      );
    }

    if (deleted === 'true') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.info,
          title: 'Operacja powiodła się!',
          message: 'Konto usunięte poprawnie!',
          duration: 4000,
        }),
      );
    }

    const role = getRole();

    if (role) {
      return navigate('/events');
    }
  }, []);

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
        <LoginForm path={path} />
      ) : (
        <RegisterForm changeFormType={handleChangeFormType} />
      )}
    </div>
  );
};

export const authAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const user = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await fetchPost('user/login', user);

  if (result.status === 401) {
    return json({ logged: false });
  }

  if (result.status !== 200) {
    throw json({ message: 'Przepraszamy wystąpił błąd' }, { status: 500 });
  }

  const data = (await result.json()) as { role: UserRole };
  localStorage.setItem('role', data.role);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());
  return json({ logged: true });
};
