import * as React from "react";
import * as ReactDOM from "react-dom";

import { Article } from "./views";
import { Server } from "./wikimedia";

const main = () => {
  const root = document.getElementById("root");
  if (root == null) {
    throw new Error("Could not find root element");
  }

  ReactDOM.render(
    <Server apiUrl="https://en.wikipedia.org/w/api.php">
      <Article title="Cat" />
    </Server>,
    root
  );
};

window.addEventListener("DOMContentLoaded", main);
