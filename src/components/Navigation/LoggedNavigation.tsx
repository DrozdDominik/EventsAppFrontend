import React from 'react';
import classes from './LoggedNavigation.module.css';
import { UserRole } from 'types';
import { NavigateBtn } from '../common/Btns/Navigate/NavigateBtn';
import { LogoutBtn } from '../common/Btns/Logout/LogoutBtn';
import { useLocation } from 'react-router-dom';
import { getRole } from '../../utils/auth';

export const LoggedNavigation = () => {
  const role = getRole();
  const location = useLocation();
  const path = location.pathname;

  return (
    <header>
      <nav>
        <ul className={classes.menuList}>
          {path !== '/events' && (
            <li>
              <NavigateBtn url={'/events'} text={'Wydarzenia'} />
            </li>
          )}
          {role === UserRole.Editor && path !== '/events/add' && (
            <li>
              <NavigateBtn url={'/events/add'} text={'Dodaj wydarzenie'} />
            </li>
          )}
          {path !== '/user/settings' && (
            <li>
              <NavigateBtn url={'/user'} text={'Panel użytkownika'} />
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
