import * as React from "react";

import "./style.css";

export default (props: {
  startingTitle: string;
  endingTitle: string;
  visited: string[];
}) => {
  return (
    <div>
      <div>
        From <span className="starting-title">{props.startingTitle}</span> to{" "}
        <span className="ending-title">{props.endingTitle}</span>
        <ol className="visited-titles">
          {props.visited.map(title => {
            const className =
              title === props.startingTitle
                ? "starting-title"
                : title === props.endingTitle
                ? "ending-title"
                : "";

            return (
              <li key={title} className={className}>
                {title}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
