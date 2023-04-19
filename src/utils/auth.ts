import { LoaderFunction, redirect } from 'react-router-dom';
import { UserRole } from 'types';
import { getTokenDuration } from './get-token-duration';
import { cleanUpLocalStorage } from './clean-up-storage';

export const getRole = (): UserRole | null => {
  return localStorage.getItem('role') as UserRole | null;
};

export const checkEditorLoader = () => {
  const role = getRole();
  const path = 'events/add';

  if (!role) {
    return redirect(`/?path=${path}&logged=false`);
  }

  if (role !== UserRole.Editor) {
    return redirect('/events?permissions=false');
  }
  return null;
};

export const getAuthRole: LoaderFunction = async () => {
  const role = getRole();

  if (!role) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration <= 0) {
    cleanUpLocalStorage();
    return null;
  }

  return null;
};
