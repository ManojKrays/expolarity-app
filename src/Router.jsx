import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login/index.jsx";
import Register from "./Pages/Register/index.jsx";
import EmailVerify from "./Pages/EmailVerify.jsx";
import Assessment from "./Pages/Assessment/Assessment.jsx";
import useAuthStore from "./store/authStore.js";
import Blog3 from "./Pages/Blogs/Blog3.jsx";
import Blog2 from "./Pages/Blogs/Blog2.jsx";
import Blog1 from "./Pages/Blogs/Blog1.jsx";

const ProtectedRoute = ({ children }) => {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }
    return children;
};

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
                    element={
                        <ProtectedRoute>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/activate"
                    element={<EmailVerify />}
                />

                <Route
                    path="/blog1"
                    element={<Blog1 />}
                />

                <Route
                    path="/blog2"
                    element={<Blog2 />}
                />

                <Route
                    path="/blog3"
                    element={<Blog3 />}
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
