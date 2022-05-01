import React from "react";
import { createRoot } from 'react-dom/client';

import "./index.css";
// eslint-disable-next-line
import App from "./App";
import AppHook from "./App_hook";

import * as serviceWorker from "./serviceWorker";

// let s = [1];

// s = s && s instanceof Array ? (s.length === 0 ? null : s) : s;

// console.log("s=", s);

// ReactDOM.render(
//   // <React.StrictMode>
//   <App />,
//   // </React.StrictMode>
//   document.getElementById("root")
// );

const root = createRoot(document.getElementById("root"));

root.render(

  // <AppHook />,
  <App />


);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
