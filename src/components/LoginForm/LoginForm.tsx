import React, { ChangeEvent, useEffect, useState } from 'react';
import classes from '../../layouts/form/form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserRole } from 'types';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { CancelBtn } from '../common/Btns/Cancel/CancelBtn';
import { ShowPassword } from '../common/ShowPassword/ShowPassword';
import { fetchPost } from '../../utils/fetch-post';
import { Form, json, useActionData, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Notification } from '../Notification/Notification';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notification);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const response = useActionData() as { logged: boolean } | undefined;

  useEffect(() => {
    if (!response) {
      return;
    }

    if (response.logged) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: 'Udane logowanie!',
          message: 'Witamy w serwisie',
          duration: 3000,
        }),
      );
      return navigate('/events');
    }

    dispatch(
      uiAction.showNotification({
        status: NotificationStatus.error,
        title: 'Błąd',
        message: 'Niepoprawne dane logowania!',
        duration: 2500,
      }),
    );
  }, [response]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiAction.clearNotification());
      }, notification.duration);
    }
  }, [notification]);

  const change = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(user => ({
      ...user,
      [e.target.name]: e.target.value,
    }));

  const cancel = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={classes.formContainer}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <h1>Logowanie</h1>
      <Form method="post" className={classes.loginForm}>
        <fieldset>
          <legend>Autentykacja</legend>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={change}
              required={true}
            />
          </label>
          <label>
            Hasło
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={change}
              required={true}
            />
            <ShowPassword
              passwordVisible={passwordVisible}
              togglePassword={handleTogglePassword}
            />
          </label>
          <div className={classes.btnsContainer}>
            <CancelBtn handleCancel={cancel} />
            <button className={classes.submit}>Zaloguj</button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const user = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await fetchPost('user/login', user);

  if (result.status === 401) {
    return json({ logged: false });
  }

  const data = (await result.json()) as { role: UserRole };
  localStorage.setItem('role', data.role);
  return json({ logged: true });
};
