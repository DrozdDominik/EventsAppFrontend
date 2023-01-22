import React, { useEffect, useState } from 'react';
import classes from './UserPanel.module.css';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { DeleteBtn } from '../../components/common/Btns/Delete/DeleteBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Spinner } from '../../components/Spinner/Spinner';
import { UserRole } from 'types';
import { getUserName } from '../../utils/get-username';
import { getUserRole } from '../../utils/get-role';
import { authActions } from '../../store/auth-slice';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';

export const UserPanel = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let userRole = role;
      if (!role) {
        userRole = await getUserRole();
        if (userRole) {
          dispatch(authActions.login(userRole));
        } else {
          dispatch(
            uiAction.showNotification({
              status: NotificationStatus.info,
              title: 'Wymagane logowanie!',
              message: '',
              duration: 4000,
            }),
          );

          navigate('/');
          return;
        }
      }

      const name = await getUserName();
      if (name === null) {
        dispatch(authActions.logout());
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.info,
            title: 'Sesja wygasła!',
            message: 'Wymagane ponowne logowanie',
            duration: 4000,
          }),
        );

        navigate('/');
        return;
      }
      setUserName(name);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiAction.clearNotification());
      }, notification.duration);
    }
  }, [notification]);

  useEffect(() => {
    if (!role) {
      return;
    }

    setLoading(true);

    (async () => {
      const name = await getUserName();
      setUserName(name as string);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  let permissions;

  switch (role) {
    case UserRole.User:
      permissions = 'podstawowy';
      break;
    case UserRole.Editor:
      permissions = 'edytor';
      break;
    case UserRole.Admin: {
      permissions = 'admin';
      break;
    }
  }

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && <DeleteModal onCancel={handleCancel} />}
      <div className={classes.container}>
        <h2>Panel użytkownika</h2>
        <div className={classes.header}>
          <p>
            Użytkownik: <span>{userName}</span>
          </p>
          <p>
            Poziom uprawnień: <span>{permissions}</span>
          </p>
        </div>
        <div>
          <ul className={classes.list}>
            <li>
              <NavigateBtn
                url={'/user/name'}
                text={'Zmień nazwę użytkownika'}
              />
            </li>
            <li>
              <NavigateBtn url={'/user/email'} text={'Zmień email'} />
            </li>
            <li>
              <NavigateBtn url={'/user/password'} text={'Zmień hasło'} />
            </li>
            {role === UserRole.User && (
              <li>
                <NavigateBtn
                  url={'/user/role'}
                  text={'Zwiększ poziom uprawnień'}
                />
              </li>
            )}
            <li>
              <DeleteBtn onDelete={() => setIsVisible(true)} />
            </li>
            <li>
              <NavigateBtn url={'/'} text={'Powrót'} />
            </li>
          </ul>
        </div>
      </div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </>
  );
};
