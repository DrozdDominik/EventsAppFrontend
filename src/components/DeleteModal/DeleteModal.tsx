import React from 'react';
import classes from './DeleteModal.module.css';
import { Form, useNavigation } from 'react-router-dom';
import { CancelBtn } from '../common/Btns/Cancel/CancelBtn';

interface Props {
  onCancel: () => void;
}

export const DeleteModal = (props: Props) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <p className={classes.title}>Potwierdź usunięcie konta</p>
        <div className={classes.btns}>
          <Form method="delete">
            <button className={classes.delete} disabled={isSubmitting}>
              {isSubmitting ? 'Usuwanie' : 'Usuń'}
            </button>
          </Form>
          <CancelBtn
            handleCancel={props.onCancel}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};
