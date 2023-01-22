import React, { useState } from 'react';
import classes from './DeleteModal.module.css';
import { DeleteBtn } from '../common/Btns/Delete/DeleteBtn';
import { fetchDelete } from '../../utils/fetch-delete';
import { NotificationStatus, uiAction } from '../../store/ui-slice';
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { CancelBtn } from '../common/Btns/Cancel/CancelBtn';

interface Props {
  onCancel: () => void;
}

export const DeleteModal = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    setLoading(true);

    const result = await fetchDelete('user/delete');

    if (result.status !== 200) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Błąd!',
          message: 'Prosimy spróbować później!',
          duration: 4000,
        }),
      );
    }

    const data = await result.json();

    if (!data) {
      dispatch(
        uiAction.showNotification({
          status: NotificationStatus.error,
          title: 'Operacja usunięcia nie powiodła się!',
          message: 'Przepraszamy, prosimy spróbować później!',
          duration: 4000,
        }),
      );
    }

    setLoading(false);
    dispatch(authActions.logout());
    dispatch(
      uiAction.showNotification({
        status: NotificationStatus.info,
        title: 'Operacja powiodła się!',
        message: 'Konto usunięte poprawnie!',
        duration: 4000,
      }),
    );
    navigate('/');
  };

  if (loading) {
    return <Spinner isLoading={loading} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <p className={classes.title}>Potwierdź usunięcie konta</p>
        <div className={classes.btns}>
          <DeleteBtn onDelete={handleDelete} />
          <CancelBtn handleCancel={props.onCancel} />
        </div>
      </div>
    </div>
  );
};
