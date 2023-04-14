import { apiUrl } from '../config/api';

export const fetchPatch = async <T>(
  path: string,
  data: T,
): Promise<Response> => {
  return await fetch(`${apiUrl}/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
};
