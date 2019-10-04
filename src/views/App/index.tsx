import * as React from "react";

import { Article, Path } from "../";
import createWikimediaClient from "../../external/wikimedia";

import "./index.css";

import { reducer, emptyState } from "../../model";

export default (props: { apiEndpoint?: string | null }) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, emptyState);
  const wikimedia = React.useMemo(
    () => createWikimediaClient({ apiEndpoint: props.apiEndpoint }),
    [props.apiEndpoint]
  );

  return (
    <>
      <button
        className="new-game-button"
        onClick={async () => {
          dispatch({ type: "BEGAN_LOADING_COURSE" });
          const [start, end] = await wikimedia.findArticlePair();
          dispatch({ type: "LOADED_COURSE", data: { start, end } });
        }}
      >
        New game
      </button>
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
    </>
  );
};
