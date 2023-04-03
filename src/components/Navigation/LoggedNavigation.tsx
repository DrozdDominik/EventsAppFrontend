import React from 'react';
import classes from './LoggedNavigation.module.css';
import { UserRole } from 'types';
import { NavigateBtn } from '../common/Btns/Navigate/NavigateBtn';
import { LogoutBtn } from '../common/Btns/Logout/LogoutBtn';
import { useRouteLoaderData } from 'react-router-dom';

export const LoggedNavigation = () => {
  const role = useRouteLoaderData('root');

  return (
    <header>
      <nav>
        <ul className={classes.menuList}>
          {role === UserRole.Editor && (
            <li>
              <NavigateBtn url={'/events/add'} text={'Dodaj wydarzenie'} />
            </li>
          )}
          <li>
            <NavigateBtn url={'/user/settings'} text={'Panel użytkownika'} />
          </li>
          <li>
            <LogoutBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
};
