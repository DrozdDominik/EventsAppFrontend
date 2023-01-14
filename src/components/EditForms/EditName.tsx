import React, { SyntheticEvent, useState } from 'react';
import { validateUsername } from '../../utils/validate-username';
import { useDispatch } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import { Spinner } from '../Spinner/Spinner';
import { fetchPost } from '../../utils/fetch-post';
import { useNavigate } from 'react-router-dom';
import classes from './EditForms.module.css';
import { ChangeBtn } from '../common/Btns/Change/ChangeBtn';

export const EditName = () => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editName = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError([]);
    setLoading(true);

    if (!validateUsername(inputData)) {
      setError([
        `Nazwa użytkownika musi mieć od 2 do 30 znaków - obecnie jest ${inputData.length}`,
      ]);
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

    const result = await fetchPost('user/name', { name: inputData });

    if (result.status !== 200) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Edycja niepowiodła się!',
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
      <form onSubmit={editName} className={classes.form}>
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
