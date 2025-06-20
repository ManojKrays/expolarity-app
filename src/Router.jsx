import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LaunchSoon from "./Pages/LaunchSoon";
import Career from "./Pages/Career/Career.jsx";
import Main from "./Pages/Main";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import EmailVerify from "./Pages/EmailVerify.jsx";

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
                    path="/career"
                    element={<Career />}
                />
                <Route
                    path="/launch"
                    element={<LaunchSoon />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
