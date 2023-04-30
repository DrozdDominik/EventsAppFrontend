import { EventFormData } from 'src/types';
import { Coordinates, geocode } from './geocoding';
import { validUrl } from './valid-url';

export const validateData = async (
  data: EventFormData,
): Promise<Coordinates | string[]> => {
  const errors: string[] = [];

  if (!data.name || data.name.length < 3 || data.name.length > 50) {
    errors.push(
      `Nazwa wydarzenia musi mieć od 3 do 50 znaków - obecnie jest ${data.name.length}`,
    );
  }

  if (
    !data.description ||
    data.description.length < 10 ||
    data.description.length > 500
  ) {
    errors.push(
      `Opis wydarzenia musi mieć od 10 do 500 znaków - obecnie jest ${data.description.length}`,
    );
  }

  if (data.time <= 0) {
    errors.push('Czas wydarzenia musi być wiekszy od 0');
  }

  if (data.categoryId === '') {
    errors.push('Należy wybrać kategorię');
  }

  if (data.link !== '' && !validUrl(data.link)) {
    errors.push('Podano niepoprawny link');
  }

  const address = `${data.number} ${data.street} ${data.city} ${data.country}`;
  const geoData = await geocode(address);

  if (geoData === null) {
    errors.push('Podano błędne dane adresowe');
    return errors;
  }

  return errors.length === 0 ? geoData : errors;
};
