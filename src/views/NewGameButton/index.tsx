import * as React from "react";

import { Api } from "../../wikimedia";
import { Action } from "../../model/Action";

import "./style.css";

export default (props: {
  dispatch: React.Dispatch<Action>;
  children: string;
}) => {
  const wiki = React.useContext(Api);

  return (
    <button
      className="new-game-button"
      onClick={async () => {
        props.dispatch({ type: "RESET" });
        const [start, end] = await wiki.random(2);
        props.dispatch({ type: "NEW_COURSE", data: { start, end } });
      }}
    >
      {props.children}
    </button>
  );
};
