import React from 'react';
import classes from './UserPanel.module.css';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { DeleteBtn } from '../../components/common/Btns/Delete/DeleteBtn';

export const UserPanel = () => {
  return (
    <div className={classes.container}>
      <h2>Panel użytkownika</h2>
      <div className={classes.header}>
        <p>
          Użytkownik: <span>User</span>
        </p>
        <p>
          Poziom uprawnień: <span>podstawowy</span>
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
          <li>
            <NavigateBtn url={'/user/role'} text={'Zwiększ poziom uprawnień'} />
          </li>
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
