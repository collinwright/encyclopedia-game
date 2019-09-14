import * as React from "react";

import { Article, Path, NewGameButton } from "../";
import { Server } from "../../wikimedia";

import "./index.css";

import { reducer, emptyState } from "../../model";

export default () => {
  const [state, dispatch] = React.useReducer(reducer, undefined, emptyState);

  return (
    <Server apiUrl="/w/api.php">
      <NewGameButton dispatch={dispatch}>New game</NewGameButton>
      {state.loading && "Loading..."}
      {state.course && (
        <Path
          startingTitle={state.course.start}
          endingTitle={state.course.end}
          visited={state.visited}
        />
      )}
      <Article
        startingTitle={state.course && state.course.start}
        onNewArticle={title => dispatch({ type: "DID_VISIT", data: title })}
      />
    </Server>
  );
};
