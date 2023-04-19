import React, { useEffect } from 'react';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { NotificationStatus, uiAction } from '../../store/ui-slice';

export const ErrorPage = () => {
  const error = useRouteError();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 400) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.info,
            title: 'Nie znaleziono!',
            message: error.data.message,
            duration: 4000,
          }),
        );
      }

      if (error.status === 404) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.info,
            title: 'Nie znaleziono!',
            message: 'Nie ma takiej strony!',
            duration: 4000,
          }),
        );
      }

      if (error.status === 500) {
        dispatch(
          uiAction.showNotification({
            status: NotificationStatus.error,
            title: 'Błąd!',
            message: error.data.message,
            duration: 4000,
          }),
        );
      }
      return navigate('/');
    }
  }, []);

  return <Spinner isLoading={true} />;
};
