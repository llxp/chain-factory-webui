import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { Core } from "./core_modules/core";
import { MaterialUIComponent } from './core_modules/core/components/core/MaterialUI';

ReactDOM.render(
  <React.StrictMode>
    <MaterialUIComponent>
      <Core/>
    </MaterialUIComponent>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
