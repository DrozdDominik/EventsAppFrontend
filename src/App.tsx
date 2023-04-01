import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { eventLoader, EventPage } from './pages/Event/EventPage';
import { ErrorPage } from './pages/Error/Error';
import { addEventAction, AddEventPage } from './pages/AddEvent/AddEventPage';
import { EditData } from './pages/EditData/EditData';
import { userNameLoader, UserPanel } from './pages/UserPanel/UserPanel';
import { EditDataType } from './types';
import { RootLayout } from './layouts/root/Root';
import { eventsLoader, EventsPage } from './pages/Events/EventsPage';
import { Auth } from './pages/Auth/Auth';
import { authLoader, checkAuthLoader, getAuthLoader } from './utils/auth';
import { EventsLayout } from './layouts/events/Events';
import { action as logoutAction } from './pages/Logout/Logout';
import { action as loginAction } from './components/LoginForm/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: authLoader,
    children: [
      {
        path: '/events',
        element: <EventsLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: 'add',
            element: <AddEventPage />,
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
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <UserPanel />,
            loader: userNameLoader,
          },
          {
            path: 'name',
            element: <EditData dataType={EditDataType.name} />,
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
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    action: loginAction,
    loader: getAuthLoader,
  },
  {
    path: '/logout',
    action: logoutAction,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
