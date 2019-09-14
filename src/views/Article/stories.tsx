import * as React from "react";
import * as Storybook from "@storybook/react";

import Article from "./";

Storybook.storiesOf("Article", module).add("Converts title to path", () => (
  <Article startingTitle="Cats" />
));
