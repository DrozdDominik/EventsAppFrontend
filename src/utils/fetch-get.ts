import { apiUrl } from '../config/api';

export const fetchGet = async (path: string): Promise<Response> => {
  return await fetch(`${apiUrl}/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
