import { apiUrl } from '../config/api';

export const fetchPatch = async <T>(
  path: string,
  data?: T,
): Promise<Response> => {
  let options: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  };

  if (data) {
    options = {
      ...options,
      body: JSON.stringify(data),
    };
  }

  return await fetch(`${apiUrl}/${path}`, options);
};
