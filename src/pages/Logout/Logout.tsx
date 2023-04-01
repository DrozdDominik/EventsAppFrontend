import { json, redirect } from 'react-router-dom';
import { apiUrl } from '../../config/api';

export const action = async () => {
  const result = await fetch(`${apiUrl}/user/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw json(
      { message: 'Wystąpił bład podczas wylogowywania' },
      { status: 500 },
    );
  }

  localStorage.removeItem('role');
  return redirect('/auth');
};
