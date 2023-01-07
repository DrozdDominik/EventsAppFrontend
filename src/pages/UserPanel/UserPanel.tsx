import React, { useEffect, useState } from 'react';
import classes from './UserPanel.module.css';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { DeleteBtn } from '../../components/common/Btns/Delete/DeleteBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Spinner } from '../../components/Spinner/Spinner';
import { UserRole } from 'types';
import { getUserName } from '../../utils/get-username';

export const UserPanel = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!role) {
      return;
    }

    setLoading(true);

    (async () => {
      const name = await getUserName();
      setUserName(name);
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

  return (
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
            <NavigateBtn url={'/user/name'} text={'Zmień nazwę użytkownika'} />
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
            <DeleteBtn />
          </li>
          <li>
            <NavigateBtn url={'/'} text={'Powrót'} />
          </li>
        </ul>
      </div>
    </div>
  );
};
