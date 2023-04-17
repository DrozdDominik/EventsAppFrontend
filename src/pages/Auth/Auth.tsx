import React, { useEffect } from 'react';
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
import { validateUserData } from '../../utils/validate-user-data';
import { UserData } from '../../types';

export const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlParams = searchParams.get('path');
  let path = '/';

  if (urlParams) {
    path = decodeURIComponent(urlParams);
  }

  const logged = searchParams.get('logged');
  const permissions = searchParams.get('permissions');
  const deleted = searchParams.get('deleted');
  const mode = searchParams.get('mode');

  const register = mode === 'register';

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

  return (
    <div className={classes.authContainer}>
      <nav>
        <AuthBtn register={register} />
      </nav>
      {register ? <RegisterForm /> : <LoginForm path={path} />}
    </div>
  );
};

export const authAction = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const mode =
    url.searchParams.get('mode') === 'register' ? 'register' : 'login';
  const endpoint = mode === 'register' ? 'user' : 'user/login';

  const formData = Object.fromEntries(await request.formData());

  if (mode === 'register') {
    const validationResult = await validateUserData(
      formData as unknown as UserData,
    );

    if (Array.isArray(validationResult)) {
      return json({
        success: false,
        errors: validationResult,
      });
    }
  }

  const response = await fetchPost(`${endpoint}`, formData);

  if (!response.ok) {
    if (response.status === 400) {
      return json({
        success: false,
        message: 'Podany email jest już zajęty!',
      });
    }

    if (response.status === 401) {
      return json({
        success: false,
        message: 'Niepoprawne dane logowania!',
      });
    }

    throw json({ message: 'Przepraszamy wystąpił błąd' }, { status: 500 });
  }

  if (response.status === 200) {
    const data = (await response.json()) as { role: UserRole };
    localStorage.setItem('role', data.role);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    localStorage.setItem('expiration', expiration.toISOString());

    return json({
      success: true,
      message: 'Udane logowanie!',
    });
  }

  return json({
    success: true,
    message: 'Rejestracja powiodła się!',
  });
};
