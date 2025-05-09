import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LaunchSoon from "./Pages/LaunchSoon";
import Main from "./Pages/Main/Main.jsx";
import Career from "./Pages/Career/Career.jsx";

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
