import { apiUrl } from '../config/api';

export const fetchDelete = async (path: string): Promise<Response> => {
  return await fetch(`${apiUrl}/${path}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
