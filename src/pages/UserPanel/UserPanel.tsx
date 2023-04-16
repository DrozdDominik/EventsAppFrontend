import React, { useEffect, useState } from 'react';
import classes from './UserPanel.module.css';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { DeleteBtn } from '../../components/common/Btns/Delete/DeleteBtn';
import { Spinner } from '../../components/Spinner/Spinner';
import { UserRole } from 'types';
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { DeleteModal } from '../../components/DeleteModal/DeleteModal';
import { getRole } from '../../utils/auth';
import { fetchGet } from '../../utils/fetch-get';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { fetchDelete } from '../../utils/fetch-delete';

export const UserPanel = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const permissions = getPermissions();
  const { name } = useLoaderData() as { name: string };
  const isLoading = navigation.state === 'loading';
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const denied = searchParams.get('denied');
  const deleted = searchParams.get('deleted');

  useEffect(() => {
    if (denied === 'true') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd!',
          message: 'Operacja niedostępna dla tego użytkownika!',
          duration: 3500,
        }),
      );
    }

    if (deleted === 'false') {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Operacja usunięcia nie powiodła się!',
          message: 'Przepraszamy, prosimy spróbować później!',
          duration: 4000,
        }),
      );
    }
  }, []);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && <DeleteModal onCancel={handleCancel} />}
      <h2 className={classes.title}>Panel użytkownika</h2>
      <div className={classes.header}>
        <p>
          Użytkownik: <span>{name}</span>
        </p>
        <p>
          Poziom uprawnień: <span>{permissions}</span>
        </p>
      </div>
      <div>
        <ul className={classes.list}>
          <li>
            <NavigateBtn url={'/user/name'} text={'Zmień nazwę użytkownika'} />
          </li>
          <li>
            <NavigateBtn url={'/user/email'} text={'Zmień email'} />
          </li>
          <li>
            <NavigateBtn url={'/user/password'} text={'Zmień hasło'} />
          </li>
          {permissions === 'podstawowy' && (
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
            <NavigateBtn url={'/events'} text={'Powrót'} />
          </li>
        </ul>
      </div>
    </>
  );
};

export const userLoader: LoaderFunction = async () => {
  const data = await fetchGet('user/name');

  if (!data.ok) {
    if (data.status === 401) {
      cleanUpLocalStorage();
      return redirect('/?path=user&logged=false');
    }

    throw json({ message: 'Przepraszamy wystąpił błąd!' }, { status: 500 });
  }

  return data;
};

export const deleteAction: ActionFunction = async () => {
  const response = await fetchDelete('user/delete');

  if (!response.ok) {
    if (response.status === 401) {
      cleanUpLocalStorage();
      return redirect('/?logged=false');
    }

    throw json(
      { message: 'Przepraszamy, prosimy spróbować później' },
      { status: 500 },
    );
  }

  if (await response.json()) {
    cleanUpLocalStorage();
    return redirect('/?deleted=true');
  }

  return redirect('/user?deleted=false');
};

const getPermissions = () => {
  const role = getRole();

  if (!role) {
    return null;
  }

  let permissions: 'podstawowy' | 'edytor' | 'admin';

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
    default:
      permissions = 'podstawowy';
  }

  return permissions;
};
