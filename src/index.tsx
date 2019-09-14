import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./views";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root == null) {
    throw new Error("Could not find root element");
  }
  ReactDOM.render(<App />, root);
});
