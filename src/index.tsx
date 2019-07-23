import * as React from "react";
import * as ReactDOM from "react-dom";

const main = () => {
  const root = document.getElementById("root");
  if (root == null) {
    throw new Error("Could not find root element");
  }

  ReactDOM.render(<p>Hello</p>, root);
};

window.addEventListener("DOMContentLoaded", main);
