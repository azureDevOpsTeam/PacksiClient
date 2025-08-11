import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Helmet} from 'react-helmet';
import {baseTitle} from "./assets/information/pageTitle";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <Helmet>
            <title>{baseTitle}</title>
        </Helmet>
        <App/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
