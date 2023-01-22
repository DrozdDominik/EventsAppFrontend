import { fetchGet } from './fetch-get';

export const getUserName = async (): Promise<string | null> => {
  const data = await fetchGet('user/name');

  if (data.status !== 200) {
    return null;
  }

  const result: { name: string } = await data.json();

  return result.name;
};
