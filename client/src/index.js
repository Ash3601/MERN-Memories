import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import { MyAlert } from "./components/Alert/MyAlert";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // subscribes the store for all the components within the Provider component
  <Provider store={store}>
    <App id="app" />
    {/* <MyAlert /> */}
  </Provider>,
  document.getElementById("root"),
);
