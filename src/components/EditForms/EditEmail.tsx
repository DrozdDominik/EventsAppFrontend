import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import { Spinner } from '../Spinner/Spinner';
import { fetchPost } from '../../utils/fetch-post';
import { useNavigate } from 'react-router-dom';
import classes from './EditForms.module.css';
import { ChangeBtn } from '../common/Btns/Change/ChangeBtn';
import { validateEmail } from '../../utils/validate-email';

export const EditEmail = () => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editEmail = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError([]);
    setLoading(true);

    if (!validateEmail(inputData)) {
      setError([`Podano niepoprawny adres email`]);
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Podano błędne dane!',
          duration: 3500,
        }),
      );
      setLoading(false);
      return;
    }

    const result = await fetchPost('user/email', { email: inputData });

    if (result.status === 400) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Podany email jest już zajęty!',
          duration: 3000,
        }),
      );
      setLoading(false);
      return;
    }

    if (result.status === 500) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Edycja nie powiodła się',
          message: 'Przepraszamy, prosimy spróbować później',
          duration: 3000,
        }),
      );
      setLoading(false);
      return;
    }

    dispatch(
      uiAction.showNotification({
        status: NotificationStatus.success,
        title: 'Udana edycja',
        message: '',
        duration: 2500,
      }),
    );

    setLoading(false);
    setInputData('');

    navigate('/user/settings');
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <>
      {error.length !== 0 && <ErrorsScreen errors={error} />}
      <form onSubmit={editEmail} className={classes.form}>
        <input
          className={classes.edit_input}
          type={'text'}
          value={inputData}
          onChange={e => setInputData(e.target.value)}
        />
        <ChangeBtn />
      </form>
    </>
  );
};
