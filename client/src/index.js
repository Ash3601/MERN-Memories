import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // subscribes the store for all the components within the Provider component
  <Provider store={store}>
    <App id="app" />
  </Provider>,
  document.getElementById("root"),
);
