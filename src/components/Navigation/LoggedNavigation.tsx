import React from 'react';
import classes from './LoggedNavigation.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserRole } from 'types';
import { NavigateBtn } from '../common/Btns/Navigate/NavigateBtn';
import { LogoutBtn } from '../common/Btns/Logout/LogoutBtn';

export const LoggedNavigation = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <header>
      <nav>
        <ul className={classes.menuList}>
          {role === UserRole.Editor && (
            <li>
              <NavigateBtn url={'/event/add'} text={'Dodaj wydarzenie'} />{' '}
            </li>
          )}
          <li>
            <LogoutBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
};
