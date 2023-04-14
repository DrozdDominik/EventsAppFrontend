import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './EditForms.module.css';
import { ChangeBtn } from '../common/Btns/Change/ChangeBtn';
import { validateEmail } from '../../utils/validate-email';
import { fetchPatch } from '../../utils/fetch-patch';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';

export const EditEmail = () => {
  const [inputData, setInputData] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const data = useActionData() as {
    edited: boolean;
    errors?: string[];
    oldData?: string;
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.oldData) {
      setInputData(data.oldData);
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Edycja nie powiodła się!',
          duration: 3000,
        }),
      );
    }

    if (data.edited) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.success,
          title: 'Udana edycja',
          message: '',
          duration: 2500,
        }),
      );
      setInputData('');
      return navigate('..');
    }
  }, [data]);

  return (
    <>
      {data && !data.edited && data.errors && (
        <ErrorsScreen errors={data.errors} />
      )}
      <Form method="patch" className={classes.form}>
        <input
          className={classes.edit_input}
          type="email"
          name="email"
          value={inputData}
          onChange={e => setInputData(e.target.value)}
        />
        <ChangeBtn isSubmitting={isSubmitting} />
      </Form>
    </>
  );
};

export const editEmailAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const inputEmail = formData.get('email') as string;

  if (!validateEmail(inputEmail)) {
    const error = ['Podano niepoprawny adres email'];
    return json({ edited: false, errors: error, oldData: inputEmail });
  }

  const response = await fetchPatch('user/email', { email: inputEmail });

  if (!response.ok) {
    if (response.status === 401) {
      cleanUpLocalStorage();
      return redirect(`/?logged=false`);
    }

    if (response.status === 400) {
      const error = ['Podany email jest już zajęty!'];
      return json({ edited: false, errors: error, oldData: inputEmail });
    }

    throw json({ message: 'Edycja niepowiodła się!' }, { status: 500 });
  }

  return json({ edited: true });
};
