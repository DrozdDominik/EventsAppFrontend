import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/Start/StartPage';
import { EventPage } from './pages/Event/EventPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

import { AddEventPage } from './pages/AddEvent/AddEventPage';
import { EditData } from './pages/EditData/EditData';
import { UserPanel } from './pages/UserPanel/UserPanel';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<StartPage />} />
          <Route path={'/event/add'} element={<AddEventPage />} />
          <Route path={'/event/:id'} element={<EventPage />} />
          <Route path={'/user/settings'} element={<UserPanel />} />
          <Route path={'/user/name'} element={<EditData dataType={'name'} />} />
          <Route
            path={'/user/email'}
            element={<EditData dataType={'email'} />}
          />
          <Route
            path={'/user/password'}
            element={<EditData dataType={'password'} />}
          />
          <Route path={'/user/role'} element={<EditData dataType={'role'} />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
