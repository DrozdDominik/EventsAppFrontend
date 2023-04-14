import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import classes from './EditForms.module.css';
import { ChangeBtn } from '../common/Btns/Change/ChangeBtn';
import { ShowPassword } from '../common/ShowPassword/ShowPassword';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { validatePassword } from '../../utils/validate-password';
import { cleanUpLocalStorage } from '../../utils/clean-up-storage';
import { fetchPatch } from '../../utils/fetch-patch';

export const EditPassword = () => {
  const [inputData, setInputData] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {data && !data.edited && data.errors && (
        <ErrorsScreen errors={data.errors} />
      )}
      <Form method="patch" className={classes.form}>
        <div className={classes.password}>
          <input
            className={classes.edit_input}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={inputData}
            onChange={e => setInputData(e.target.value)}
          />
          <ShowPassword
            passwordVisible={passwordVisible}
            togglePassword={handleTogglePassword}
          />
        </div>
        <ChangeBtn isSubmitting={isSubmitting} />
      </Form>
    </>
  );
};

export const editPasswordAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const inputPassword = formData.get('password') as string;

  if (!validatePassword(inputPassword)) {
    const error = [
      'Hasło musi zawierać od 7 do 15 znaków w tym przynajmniej jedną literą, cyfrę i znak specjalny',
    ];
    return json({ edited: false, errors: error, oldData: inputPassword });
  }

  const response = await fetchPatch('user/pass', { password: inputPassword });

  if (!response.ok) {
    if (response.status === 401) {
      cleanUpLocalStorage();
      return redirect(`/?logged=false`);
    }

    if (response.status === 400) {
      throw json(
        { message: 'Podane hasło nie spełnia wymagań' },
        { status: 400 },
      );
    }

    throw json({ message: 'Edycja niepowiodła się!' }, { status: 500 });
  }

  return json({ edited: true });
};
