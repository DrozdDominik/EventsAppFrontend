import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StartPage} from "./pages/Start/StartPage";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<StartPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    );
}
