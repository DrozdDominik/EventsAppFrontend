import React, { useEffect, useState } from 'react';
import classes from './UpgradeRole.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { apiUrl } from '../../config/api';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { fetchGet } from '../../utils/fetch-get';

export const UpgradeRole = () => {
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await fetchGet('user/permissions');

      if (result.status === 400) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.error,
            title: 'Błąd',
            message: 'Operacja niedostępna!',
            duration: 4000,
          }),
        );

        navigate('/');
      }

      const data = (await result.json()) as boolean;

      if (data) {
        setRequested(true);
      }
    })();

    setLoading(false);
  }, []);

  const upgradeRole = async () => {
    setLoading(true);

    const result = await fetch(`${apiUrl}/user/permissions`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (result.status === 400) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Operacja niedostępna!',
          duration: 4000,
        }),
      );

      navigate('/');
    }

    if (result.status === 500) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Przepraszamy, prosimy spróbować póżniej',
          duration: 4000,
        }),
      );

      navigate('/');
    }

    dispatch(
      uiAction.showNotification({
        status: NotificationStatus.success,
        title: 'Prośba wysłana!',
        message: 'Prosimy poczekać na odpowiedź admina',
        duration: 4000,
      }),
    );

    setRequested(true);
    setLoading(false);
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <>
      {requested ? (
        <div className={classes.message}>
          Prośba wysłana, administrator rozpatruje zgłoszenie.
        </div>
      ) : (
        <button className={classes.upgrade} onClick={upgradeRole}>
          Uzyskaj uprawnienia edytora
        </button>
      )}
    </>
  );
};
