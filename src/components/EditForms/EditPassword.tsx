import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { ErrorsScreen } from '../ErrorsScreen/ErrorsScreen';
import classes from './EditForms.module.css';
import { ChangeBtn } from '../common/Btns/Change/ChangeBtn';
import { ShowPassword } from '../common/ShowPassword/ShowPassword';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { fetchPost } from '../../utils/fetch-post';
import { validatePassword } from '../../utils/validate-password';

export const EditPassword = () => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editPassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError([]);
    setLoading(true);

    if (!validatePassword(inputData)) {
      setError([
        `Hasło musi zawierać od 7 do 15 znaków w tym przynajmniej jedną literą, cyfrę i znak specjalny`,
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

    const result = await fetchPost('user/pass', { password: inputData });

    if (result.status === 400) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd',
          message: 'Podane hasło nie spełnia wymagań',
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

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <>
      {error.length !== 0 && <ErrorsScreen errors={error} />}
      <form onSubmit={editPassword} className={classes.form}>
        <div className={classes.password}>
          <input
            className={classes.edit_input}
            type={passwordVisible ? 'text' : 'password'}
            value={inputData}
            onChange={e => setInputData(e.target.value)}
          />
          <ShowPassword
            passwordVisible={passwordVisible}
            togglePassword={handleTogglePassword}
          />
        </div>
        <ChangeBtn />
      </form>
    </>
  );
};
