import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StartPage} from "./pages/Start/StartPage";
import {EventPage} from "./pages/Event/EventPage";
import {NotFoundPage} from "./pages/NotFound/NotFoundPage";

import {AddEventPage} from "./pages/AddEvent/AddEventPage";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<StartPage /> } />
                    <Route path={'/event/add'} element={<AddEventPage />} />
                    <Route path={'/event/:id'} element={<EventPage />} />
                    <Route path={'*'} element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
