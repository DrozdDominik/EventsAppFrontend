import React from 'react';
import { json, useNavigation } from 'react-router-dom';
import { EventAddForm } from '../../components/EventAddForm/EventAddForm';
import { Spinner } from '../../components/Spinner/Spinner';
import { NewEventData } from 'types';
import { EventFormData } from '../../types';
import { validateData } from '../../utils/validate-event-data';
import { addProtocol } from '../../utils/addProtocol';
import { fetchPost } from '../../utils/fetch-post';

export const AddEventPage = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      <EventAddForm />
    </>
  );
};

const sendData = async (data: NewEventData): Promise<string | null> => {
  const result = await fetchPost('api/event', data);

  return result.status === 201 ? await result.json() : null;
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

  const id = await sendData(eventToSave);

  if (!id) {
    throw json({ message: 'Nie udało się dodać wydarzenia!' }, { status: 500 });
  } else {
    return json({ added: true, id });
  }
};
