import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { collectBrowserInfo } from "./browserInfo";
import { createIframe } from "./iframe";
import { createForm } from "./form";
import { getCurrentAction, performAction } from "./action";
import APIClient from "./api/client";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// TODO: this is a dirty way to expose js code, but since eventually,
//       all of this threeds-demo-app stuff should be merged into checkout.js,
//       we don't care about this for now
(window as any).collectBrowserInfo = collectBrowserInfo;
(window as any).createIframe = createIframe;
(window as any).createForm = createForm;
(window as any).getCurrentAction = getCurrentAction;
(window as any).performAction = performAction;
(window as any).waitForMessage = waitForMessage;
(window as any).parseThreeDSAuthentication = parseThreeDSAuthentication;
(window as any).APIClient = APIClient;
