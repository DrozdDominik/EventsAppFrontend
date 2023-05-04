import React, { useEffect, useState } from 'react';
import classes from './EventAddForm.module.css';
import { NavigateBtn } from '../common/Btns/Navigate/NavigateBtn';
import { EventFormData } from 'src/types';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { CategoryEntity } from 'types';
import { Spinner } from '../Spinner/Spinner';

export const EventAddForm = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const isLoading = navigation.state === 'loading';
  const { categories } = useLoaderData() as { categories: CategoryEntity[] };

  const initialState: EventFormData = {
    name: '',
    description: '',
    time: 0,
    link: '',
    country: 'Polska',
    city: '',
    street: '',
    number: '',
    categoryId: '',
  };

  const [eventData, setEventData] = useState<EventFormData>(initialState);
  const dispatch = useDispatch();
  const data = useActionData() as {
    added: boolean;
    errors?: string[];
    oldData?: EventFormData;
    id?: string;
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.oldData) {
      setEventData(data.oldData);
    }

    if (data.added) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: 'Dodano wydarzenie',
          message: '',
          duration: 3500,
        }),
      );
      setEventData(initialState);
      return navigate(`/events/${data.id}`);
    }
  }, [data]);

  const updateForm = (key: string, value: string | number) => {
    setEventData(eventData => ({
      ...eventData,
      [key]: value,
    }));
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      {data && !data.added && data.errors && (
        <ErrorsScreen errors={data.errors} />
      )}
      <div className={classes.card}>
        <div className={classes.card_info}>
          <h1 className={classes.card_header}>Dodaj wydarzenie</h1>
        </div>
        <Form method={'post'} className={classes.add_event_form}>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="name"
              value={eventData.name}
              onChange={e => updateForm('name', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Nazwa wydarzenia</label>
          </div>
          <div className={classes.input}>
            <textarea
              className={classes.input_field}
              name="description"
              value={eventData.description}
              onChange={e => updateForm('description', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Opis</label>
          </div>
          <div className={classes.input}>
            <input
              type="number"
              className={classes.input_field}
              name="time"
              value={eventData.time}
              onChange={e => updateForm('time', e.target.value)}
              min={1}
              step={1}
              required={true}
            />
            <label className={classes.input_label}>
              Planowany czas trwania (minuty)
            </label>
          </div>
          <div className={classes.input}>
            <select
              className={classes.input_field}
              name="categoryId"
              onChange={e => updateForm('categoryId', e.target.value)}
              value={eventData.categoryId}
              required={true}
            >
              <option value={''}></option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label className={classes.input_label}>Kategoria</label>
          </div>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="link"
              value={eventData.link}
              onChange={e => updateForm('link', e.target.value)}
            />
            <label className={classes.input_label}>
              Link do strony wydarzenia (opcjonalne)
            </label>
          </div>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="country"
              value={eventData.country}
              onChange={e => updateForm('country', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Kraj</label>
          </div>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="city"
              value={eventData.city}
              onChange={e => updateForm('city', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Miasto</label>
          </div>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="street"
              value={eventData.street}
              onChange={e => updateForm('street', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Ulica</label>
          </div>
          <div className={classes.input}>
            <input
              type="text"
              className={classes.input_field}
              name="number"
              value={eventData.number}
              onChange={e => updateForm('number', e.target.value)}
              required={true}
            />
            <label className={classes.input_label}>Numer budynku</label>
          </div>
          <div className={classes.div_submit}>
            <button
              className={classes.btn_submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Dodawanie...' : 'Dodaj!'}
            </button>
            <NavigateBtn url={'/events'} text={'Powrót'} />
          </div>
        </Form>
      </div>
    </>
  );
};
