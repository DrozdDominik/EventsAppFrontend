import { fetchGet } from './fetch-get';

export const getUserName = async (): Promise<string> => {
  const data = await fetchGet('user/name');

  const result: { name: string } = await data.json();

  return result.name;
};
