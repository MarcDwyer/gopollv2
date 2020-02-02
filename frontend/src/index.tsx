import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import Main from "./containers/Main/main";

import "./index.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById("root")
);
