import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Reducers from "./reducers/reducers";

import Main from "./containers/Main/main";

import "./index.css";

const store = createStore(Reducers, applyMiddleware(thunk));

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("root")
);
