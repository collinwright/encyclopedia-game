import * as React from "react";
import { hot } from "react-hot-loader";

import { Article, Duration, Path } from "../";
import createWikimediaClient, { Options } from "../../external/wikimedia";
import { reducer, emptyState } from "../../model";

import "./index.css";
import useTrueVerticalHeight from "./useTrueVerticalHeight";

export default hot(module)(function App(props: {
  wikimediaOptions: Partial<Options>;
}) {
  const [state, dispatch] = React.useReducer(reducer, undefined, emptyState);
  const wikimedia = React.useMemo(
    () => createWikimediaClient(props.wikimediaOptions),
    [props.wikimediaOptions]
  );

  const container = useTrueVerticalHeight<HTMLDivElement>("--vh", []);

  return (
    <div id="container" ref={container}>
      <div id="controls">
        <h1>The Encyclopedia Game</h1>

        {state.loading && (
          <p>
            Finding a random pair of articles which are close to one another...
          </p>
        )}

        {state.course && <Path course={state.course} visited={state.visited} />}

        {state.startingTime && (
          <p>
            {state.finishTime == null
              ? "You have been playing for "
              : "You played for "}
            <Duration
              startingTime={state.startingTime}
              endingTime={state.finishTime}
            />
            .
          </p>
        )}

        <hr />

        <button
          className="new-game-button"
          disabled={state.loading}
          onClick={async () => {
            dispatch({ type: "BEGAN_LOADING_COURSE" });
            try {
              dispatch({
                type: "LOADED_COURSE",
                data: {
                  course: await wikimedia.findArticlePair(),
                  now: new Date()
                }
              });
            } catch (_) {
              dispatch({ type: "CRITICAL_ERROR" });
            }
          }}
        >
          New game
        </button>

        <hr />

        <p>
          You can{" "}
          <a href="https://github.com/collinwright/encyclopedia-game">
            check out the source code
          </a>
          .
        </p>

        <p>
          I'm not affiliated with Wikipedia, but consider{" "}
          <a href="https://donate.wikimedia.org/">
            donating to the Wikimedia Foundation!
          </a>
        </p>
      </div>
      <div id="content">
        <Article
          startingTitle={state.course && state.course.start}
          onNewArticle={title =>
            dispatch({ type: "DID_VISIT", data: { title, now: new Date() } })
          }
        />
      </div>
    </div>
  );
});
