import { json, redirect } from 'react-router-dom';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';
import { fetchGet } from '../../utils/fetch-get';

export const logoutAction = async () => {
  const result = await fetchGet('user/logout');

  if (result.status !== 200) {
    throw json(
      { message: 'Wystąpił bład podczas wylogowywania' },
      { status: 500 },
    );
  }

  cleanUpLocalStorage();
  return redirect('/');
};
