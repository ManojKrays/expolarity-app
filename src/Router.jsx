import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeenBrainTeasers from "./Component/TeenBrainTeasers/TeenBrainTeasers.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";

const Router = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeenBrainTeasers />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;