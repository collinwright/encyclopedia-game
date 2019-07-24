import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import * as Links from "./Links";
import { Link } from "@storybook/router";

const MockLinkedText = (props: { links: string[]; children: string }) => (
  <Links.Context.Provider value={props.links}>
    <Links.LinkedText onLinkSelected={action("Link selected")}>
      {props.children}
    </Links.LinkedText>
  </Links.Context.Provider>
);

storiesOf("Links", module)
  .add("Text with no links", () => (
    <Links.LinkedText onLinkSelected={() => {}}>Hello, world!</Links.LinkedText>
  ))
  .add("Text with a single link", () => (
    <MockLinkedText links={["hyperlink"]}>Here is a hyperlink.</MockLinkedText>
  ))
  .add("Link text repeated", () => (
    <MockLinkedText links={["hyperlink"]}>
      We display hyperlinks, but only the first occurence of the word becomes a
      hyperlink.
    </MockLinkedText>
  ))
  .add("Multiple links", () => (
    <MockLinkedText links={["red", "blue", "orange"]}>
      Would you like a red, blue, or orange ball?
    </MockLinkedText>
  ))
  .add("Multiple links with repeats", () => (
    <MockLinkedText links={["red", "blue", "orange"]}>
      Would you like a red, blue, or orange ball? Red balls are bouncy, blue
      balls are soft, and orange balls are big.
    </MockLinkedText>
  ));
