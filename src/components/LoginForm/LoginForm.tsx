import React, { ChangeEvent, useEffect, useState } from 'react';
import classes from '../../layouts/form/form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { CancelBtn } from '../common/Btns/Cancel/CancelBtn';
import { ShowPassword } from '../common/ShowPassword/ShowPassword';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { RootState } from '../../store';
import { Notification } from '../Notification/Notification';
import { AuthActionData } from '../../types';

interface Props {
  path: string;
}

export const LoginForm = (props: Props) => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notification);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const response = useActionData() as AuthActionData;
  const [path, setPath] = useState<string>('/');

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (props.path) {
      props.path === '/' ? setPath('events') : setPath(props.path);
    }

    if (!response) {
      return;
    }

    if (response.success) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: response.message,
          message: 'Witamy w serwisie',
          duration: 3000,
        }),
      );

      return navigate(`${path}`);
    }

    dispatch(
      uiAction.showNotification({
        status: NotificationStatus.error,
        title: 'Błąd',
        message: response.message,
        duration: 2500,
      }),
    );
  }, [response]);

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
            <button className={classes.submit} disabled={isSubmitting}>
              {isSubmitting ? 'Logowanie' : 'Zaloguj'}
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};
