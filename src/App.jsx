import React from "react";
import Router from "./Router";
import MessageBar from "./service/Messagebar";

const App = () => {
    return (
        <>
            <MessageBar />
            <Router />
        </>
    );
};

export default App;
