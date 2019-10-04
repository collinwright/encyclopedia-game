import * as React from "react";
import { hot } from "react-hot-loader";

import { Article, Path } from "../";
import createWikimediaClient, { Options } from "../../external/wikimedia";

import "./index.css";

import { reducer, emptyState } from "../../model";

export default hot(module)((props: { wikimediaOptions: Partial<Options> }) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, emptyState);
  const wikimedia = React.useMemo(
    () => createWikimediaClient(props.wikimediaOptions),
    [props.wikimediaOptions]
  );

  return (
    <>
      <div id="controls">
        <h1>The Encyclopedia Game</h1>
        {state.loading &&
          "Finding a random pair of articles which are close to one another..."}

        {state.course && <Path course={state.course} visited={state.visited} />}

        <button
          className="new-game-button"
          disabled={state.loading}
          onClick={async () => {
            dispatch({ type: "BEGAN_LOADING_COURSE" });
            try {
              dispatch({
                type: "LOADED_COURSE",
                data: await wikimedia.findArticlePair()
              });
            } catch (_) {
              dispatch({ type: "CRITICAL_ERROR" });
            }
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
});
