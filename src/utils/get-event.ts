import { EventEntity } from 'types';
import { fetchGet } from './fetch-get';

export const getEvent = async (id: string): Promise<EventEntity | null> => {
  const result = await fetchGet(`api/event/${id}`);

  if (result.status === 400 || result.status === 404) {
    return null;
  }

  return (await result.json()) as EventEntity;
};
