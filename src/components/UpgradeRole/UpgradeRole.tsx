import React, { useEffect } from 'react';
import classes from './UpgradeRole.module.css';
import { useDispatch } from 'react-redux';
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { fetchGet } from '../../utils/fetch-get';
import { fetchPatch } from '../../utils/fetch-patch';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';

export const UpgradeRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const isLoading = navigation.state === 'loading';

  const requested = useLoaderData() as boolean;

  const data = useActionData() as {
    send: boolean;
    error?: string;
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.error) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: data.error,
          duration: 3000,
        }),
      );
      return navigate('..');
    }

    if (data.send) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: 'Prośba wysłana!',
          message: 'Prosimy poczekać na odpowiedź admina',
          duration: 4000,
        }),
      );
      return navigate('..');
    }
  }, [data]);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      {requested ? (
        <div className={classes.message}>
          Prośba wysłana, administrator rozpatruje zgłoszenie.
        </div>
      ) : (
        <Form method={'patch'}>
          <button type="submit" className={classes.upgrade}>
            {isSubmitting ? 'Wysyłanie prośby' : 'Uzyskaj uprawnienia edytora'}
          </button>
        </Form>
      )}
    </>
  );
};

export const upgradeRoleLoader: LoaderFunction = async () => {
  const data = await fetchGet('user/permissions');

  if (!data.ok) {
    if (data.status === 401) {
      cleanUpLocalStorage();
      const path = encodeURIComponent('user/role');
      return redirect(`/?path=${path}&logged=false`);
    }

    if (data.status === 400) {
      throw json(
        { message: 'Operacja niedostępna dla tego użytkownika!' },
        { status: 400 },
      );
    }

    throw json({ message: 'Błąd podczas pobierania danych' }, { status: 500 });
  }

  return data;
};

export const upgradeRoleAction: ActionFunction = async () => {
  const response = await fetchPatch('user/permissions');

  if (!response.ok) {
    if (response.status === 401) {
      cleanUpLocalStorage();
      return redirect(`/?logged=false`);
    }

    if (response.status === 400) {
      const error = 'Operacja niedostępna!';
      return json({ send: false, error });
    }

    throw json({ message: 'Operacja niepowiodła się!' }, { status: 500 });
  }

  return json({ send: true });
};
