import * as React from "react";
import * as ReactDOM from "react-dom";

import { Article, Path } from "./views";
import { Server } from "./wikimedia";

import "./index.css";

const App = () => {
  const [visited, setVisited] = React.useState<string[]>([]);

  return (
    <Server apiUrl="https://en.wikipedia.org/w/api.php">
      <Path startingTitle="Dog" endingTitle="Wolf" visited={visited} />
      <Article
        startingTitle="Dog"
        onNewArticle={title => setVisited([...visited, title])}
      />
    </Server>
  );
};

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root == null) {
    throw new Error("Could not find root element");
  }
  ReactDOM.render(<App />, root);
});
