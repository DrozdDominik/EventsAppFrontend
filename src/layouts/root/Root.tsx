import React, { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uiAction } from '../../store/ui-slice';

export const RootLayout = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notification);
  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {
    data ? navigate('/events') : navigate('/auth');
  }, [data]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiAction.clearNotification());
      }, notification.duration);
    }
  }, [notification]);

  return (
    <div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Outlet />
    </div>
  );
};
