import { redirect } from 'react-router-dom';
import { UserRole } from 'types';
import { fetchGet } from './fetch-get';

export const getRole = (): UserRole | null => {
  const role = localStorage.getItem('role');

  if (!role) {
    return null;
  }

  return role as UserRole;
};
export const getAuthLoader = async () => {
  const role = getRole();

  if (role) {
    return redirect('/events');
  }

  return null;
};

export const checkAuthLoader = () => {
  const role = getRole();

  if (!role) {
    redirect('/auth');
  }
  return null;
};

export const authLoader = async (): Promise<UserRole | null> => {
  const result = await fetchGet(`user/role`);

  if (result.status === 401) {
    const role = getRole();

    if (role) {
      localStorage.removeItem('role');
    }
    return null;
  }

  const { role } = (await result.json()) as { role: UserRole };
  localStorage.setItem('role', role);

  return role;
};
