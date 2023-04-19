import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uiAction } from '../../store/ui-slice';

export const RootLayout = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.ui.notification);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(uiAction.cleanUpNotification());
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
