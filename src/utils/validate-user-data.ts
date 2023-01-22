import { UserData } from '../types';
import { validateEmail } from './validate-email';
import { validatePassword } from './validate-password';
import { validateUsername } from './validate-username';

export const validateUserData = async (
  data: UserData,
): Promise<true | string[]> => {
  const errors: string[] = [];

  if (!validateUsername(data.name)) {
    errors.push(
      `Nazwa użytkownika musi mieć od 2 do 30 znaków - obecnie jest ${data.name.length}`,
    );
  }

  if (!validateEmail(data.email)) {
    errors.push('Podano niepoprawny email');
  }

  if (!validatePassword(data.password)) {
    errors.push(
      'Hasło musi zawierać od 7 do 15 znaków w tym przynajmniej jedną literą, cyfrę i znak specjalny',
    );
  }

  return errors.length === 0 ? true : errors;
};
