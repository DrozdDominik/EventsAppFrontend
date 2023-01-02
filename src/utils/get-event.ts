import { EventEntity } from 'types';
import { apiUrl } from '../config/api';

export const getEvent = async (id: string): Promise<EventEntity | null> => {
  const result = await fetch(`${apiUrl}/api/event/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (result.status === 400 || result.status === 404) {
    return null;
  }

  return (await result.json()) as EventEntity;
};
