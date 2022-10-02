import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RegisterPage} from "./components/Register/RegisterPage";
import {StartPage} from "./components/StartPage/StartPage";

const router = createBrowserRouter([
    {path: '/', element: <StartPage />},
    {path: '/rejestracja', element: <RegisterPage />},
]);

export const App = () => {
    return (
        <>
            <RouterProvider router={router} />

        </>
    );
}
