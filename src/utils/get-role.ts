import { UserRole } from 'types';
import { fetchGet } from './fetch-get';

export const getUserRole = async (): Promise<UserRole | null> => {
  const result = await fetchGet(`user/role`);

  if (result.status === 401) {
    return null;
  }

  const data = (await result.json()) as { role: UserRole };

  return data.role;
};
