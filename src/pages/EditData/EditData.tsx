import React, { useEffect, useState } from 'react';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EditDataType } from '../../types';
import { Notification } from '../../components/Notification/Notification';
import { EditName } from '../../components/EditForms/EditName';
import { Spinner } from '../../components/Spinner/Spinner';
import { getUserRole } from '../../utils/get-role';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useNavigate } from 'react-router-dom';
import classes from './EditData.module.css';
import { EditEmail } from '../../components/EditForms/EditEmail';
import { EditPassword } from '../../components/EditForms/EditPassword';
import { UpgradeRole } from '../../components/UpgradeRole/UpgradeRole';

interface Props {
  dataType: EditDataType;
}
export const EditData = (props: Props) => {
  const { role } = useSelector((state: RootState) => state.auth);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let userRole = role;
      if (!role) {
        userRole = await getUserRole();
        if (!userRole) {
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

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Edytuj</h2>
      {props.dataType === EditDataType.name && (
        <div className={classes.main}>
          <p className={classes.text}>Nazwa użytkownika</p>
          <EditName />
        </div>
      )}
      {props.dataType === EditDataType.email && (
        <>
          <p className={classes.text}>Email</p>
          <EditEmail />
        </>
      )}
      {props.dataType === EditDataType.password && (
        <>
          <p className={classes.text}>Hasło</p>
          <EditPassword />
        </>
      )}
      {props.dataType === EditDataType.role && (
        <>
          <p className={classes.text}>Podnieś uprawnienia użytkownika</p>
          <UpgradeRole />
        </>
      )}
      <NavigateBtn url={'/user/settings'} text={'Powrót'} />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
};
