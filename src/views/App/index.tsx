import * as React from "react";

import { Article, Path } from "../";
import createWikimediaClient, { Options } from "../../external/wikimedia";

import "./index.css";

import { reducer, emptyState } from "../../model";

export default (props: { wikimediaOptions?: Partial<Options> }) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, emptyState);
  const wikimedia = React.useMemo(
    () => createWikimediaClient(props.wikimediaOptions || {}),
    [props.wikimediaOptions]
  );

  return (
    <>
      <div id="controls">
        {state.loading &&
          "Finding a random pair of articles which are close to one another..."}

        {state.course && <Path course={state.course} visited={state.visited} />}

        <button
          className="new-game-button"
          onClick={async () => {
            dispatch({ type: "BEGAN_LOADING_COURSE" });
            dispatch({
              type: "LOADED_COURSE",
              data: await wikimedia.findArticlePair()
            });
          }}
        >
          New game
        </button>
      </div>
      <div id="content">
        <Article
          startingTitle={state.course && state.course.start}
          onNewArticle={title => dispatch({ type: "DID_VISIT", data: title })}
        />
      </div>
    </>
  );
};
