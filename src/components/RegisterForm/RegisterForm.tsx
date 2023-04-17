import React, { ChangeEvent, useEffect, useState } from 'react';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import classes from '../../layouts/form/form.module.css';
import { CancelBtn } from '../common/Btns/Cancel/CancelBtn';
import { ShowPassword } from '../common/ShowPassword/ShowPassword';
import { AuthActionData, UserData } from '../../types';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [user, setUser] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const response = useActionData() as AuthActionData;

  useEffect(() => {
    if (!response) {
      return;
    }

    if (response.success) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: response.message,
          message: 'Możesz już się zalogować',
          duration: 4000,
        }),
      );

      return navigate('/');
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
    setUser(person => ({
      ...person,
      [e.target.name]: e.target.value,
    }));

  const cancel = () => {
    setUser({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {response && !response.success && response.errors && (
        <ErrorsScreen errors={response.errors} />
      )}
      <div className={classes.formContainer}>
        <h1>Rejestracja</h1>
        <Form method="post" className={classes.registerForm}>
          <fieldset>
            <legend>Podaj dane</legend>
            <label>
              <span>Użytkownik</span>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={change}
                required={true}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={change}
                required={true}
              />
            </label>
            <label>
              <span>Hasło</span>
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
              <button
                className={classes.submit}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Rejestracja' : 'Zarejestruj!'}
              </button>
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
};
