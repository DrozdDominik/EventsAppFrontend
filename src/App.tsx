import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { eventLoader, EventPage } from './pages/Event/EventPage';
import { ErrorPage } from './pages/Error/Error';
import { addEventAction, AddEventPage } from './pages/AddEvent/AddEventPage';
import { EditData } from './pages/EditData/EditData';
import {
  deleteAction,
  userLoader,
  UserPanel,
} from './pages/UserPanel/UserPanel';
import { EditDataType } from './types';
import { RootLayout } from './layouts/root/Root';
import { eventsLoader, EventsPage } from './pages/Events/EventsPage';
import { Auth } from './pages/Auth/Auth';
import { checkEditorLoader, getAuthRole } from './utils/auth';
import { EventsLayout } from './layouts/events/Events';
import { logoutAction } from './pages/Logout/Logout';
import { authAction } from './pages/Auth/Auth';
import { editNameAction } from './components/EditForms/EditName';
import { userAuthLoader, UserLayout } from './layouts/user/User';
import { editPasswordAction } from './components/EditForms/EditPassword';
import { editEmailAction } from './components/EditForms/EditEmail';
import {
  upgradeRoleAction,
  upgradeRoleLoader,
} from './components/UpgradeRole/UpgradeRole';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: getAuthRole,
    children: [
      {
        index: true,
        element: <Auth />,
        action: authAction,
      },
      {
        path: 'events',
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: 'add',
            element: <AddEventPage />,
            loader: checkEditorLoader,
            action: addEventAction,
          },
          {
            path: ':id',
            element: <EventPage />,
            loader: eventLoader,
          },
        ],
      },
      {
        path: 'user',
        element: <UserLayout />,
        loader: userAuthLoader,
        children: [
          {
            index: true,
            element: <UserPanel />,
            loader: userLoader,
            action: deleteAction,
          },
          {
            path: 'name',
            element: <EditData dataType={EditDataType.name} />,
            action: editNameAction,
          },
          {
            path: 'email',
            element: <EditData dataType={EditDataType.email} />,
            action: editEmailAction,
          },
          {
            path: 'password',
            element: <EditData dataType={EditDataType.password} />,
            action: editPasswordAction,
          },
          {
            path: 'role',
            element: <EditData dataType={EditDataType.role} />,
            loader: upgradeRoleLoader,
            action: upgradeRoleAction,
          },
        ],
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
