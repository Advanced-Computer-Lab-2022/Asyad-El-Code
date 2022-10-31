import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";

// cont store = configureStore({reducer:})
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
