import { UserRole } from 'types';
import { apiUrl } from '../config/api';

export const getUserRole = async (): Promise<UserRole | null> => {
  const result = await fetch(`${apiUrl}/user/role`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (result.status === 401) {
    return null;
  }

  const data = (await result.json()) as { role: UserRole };

  return data.role;
};
