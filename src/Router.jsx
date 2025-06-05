import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LaunchSoon from "./Pages/LaunchSoon";
import Career from "./Pages/Career/Career.jsx";
import Main from "./Pages/Main";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
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
