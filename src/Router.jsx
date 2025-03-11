import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeenBrainTeasers from "./Component/TeenBrainTeasers/TeenBrainTeasers.jsx";

const Router = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeenBrainTeasers />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;