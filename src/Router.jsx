import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import EmailVerify from "./Pages/EmailVerify.jsx";
import Assessment from "./Pages/Assessment/Assessment.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/activate"
                    element={<EmailVerify />}
                />

                <Route
                    path="/Assessment"
                    element={<Assessment />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
