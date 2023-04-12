import React from 'react';
import { json, redirect } from 'react-router-dom';
import { EventAddForm } from '../../components/EventAddForm/EventAddForm';
import { NewEventData } from 'types';
import { EventFormData } from '../../types';
import { validateData } from '../../utils/validate-event-data';
import { addProtocol } from '../../utils/addProtocol';
import { fetchPost } from '../../utils/fetch-post';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';

export const AddEventPage = () => {
  return (
    <>
      <EventAddForm />
    </>
  );
};

export const addEventAction = async ({ request }: { request: Request }) => {
  const formData = Object.fromEntries(
    await request.formData(),
  ) as unknown as EventFormData;
  const validationResult = await validateData(formData);

  if (Array.isArray(validationResult)) {
    return json({ added: false, errors: validationResult, oldData: formData });
  }

  const { lat, lon } = validationResult;

  const eventToSave: NewEventData = {
    name: formData.name,
    description: formData.description,
    estimatedTime: Number(formData.time),
    link: formData.link !== '' ? addProtocol(formData.link) : null,
    lat,
    lon,
  };

  const response = await fetchPost('api/event', eventToSave);

  if (!response.ok) {
    if (response.status === 403) {
      cleanUpLocalStorage();
      return redirect(`/?permissions=false`);
    }

    throw json({ message: 'Nie udało się dodać wydarzenia!' }, { status: 500 });
  }

  const id = (await response.json()) as string;

  return json({ added: true, id });
};
