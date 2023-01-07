import { MainEventData } from 'types';
import { fetchGet } from './fetch-get';

export const getEvents = async (): Promise<MainEventData[] | false> => {
  const data = await fetchGet('api/event');

  if (data.status === 401) {
    return false;
  }

  const result = (await data.json()) as { events: MainEventData[] };

  return result.events;
};
