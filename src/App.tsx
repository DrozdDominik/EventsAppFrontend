import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { eventLoader, EventPage } from './pages/Event/EventPage';
import { ErrorPage } from './pages/Error/Error';
import { addEventAction, AddEventPage } from './pages/AddEvent/AddEventPage';
import { EditData } from './pages/EditData/EditData';
import { userLoader, UserPanel } from './pages/UserPanel/UserPanel';
import { EditDataType } from './types';
import { RootLayout } from './layouts/root/Root';
import { eventsLoader, EventsPage } from './pages/Events/EventsPage';
import { Auth } from './pages/Auth/Auth';
import { checkEditorLoader, getAuthRole } from './utils/auth';
import { EventsLayout } from './layouts/events/Events';
import { action as logoutAction } from './pages/Logout/Logout';
import { authAction } from './pages/Auth/Auth';
import { editNameAction } from './components/EditForms/EditName';
import { UserLayout } from './layouts/user/User';

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
        children: [
          {
            index: true,
            element: <UserPanel />,
            loader: userLoader,
          },
          {
            path: 'name',
            element: <EditData dataType={EditDataType.name} />,
            action: editNameAction,
          },
          {
            path: 'email',
            element: <EditData dataType={EditDataType.email} />,
          },
          {
            path: 'password',
            element: <EditData dataType={EditDataType.password} />,
          },
          {
            path: 'role',
            element: <EditData dataType={EditDataType.role} />,
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
