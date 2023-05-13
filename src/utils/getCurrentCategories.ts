import { MainEventData } from 'types';

export const getCurrentCategories = (events: MainEventData[]): string[] =>
  Array.from(new Set(events.map(event => event.category)));
