import * as React from "react";

import { ArticlePair } from "../../external/wikimedia";

import "./style.css";

export default function Path(props: {
  course: ArticlePair;
  visited: string[];
}) {
  return (
    <div className="article-path">
      <div>
        Starting from{" "}
        <span className="starting-title">{props.course.start}</span>, find{" "}
        <span className="ending-title">{props.course.end}</span>. They are{" "}
        {props.course.distance} steps apart.
        {props.visited.length > 0 ? (
          <>
            <br />
            <br />
            You have visited {props.visited.length}{" "}
            {props.visited.length > 1 ? "articles" : "article"}:
            <ol className="visited-titles">
              {props.visited.map(title => {
                const className =
                  title === props.course.start
                    ? "starting-title"
                    : title === props.course.end
                    ? "ending-title"
                    : "";

                return (
                  <li key={title} className={className}>
                    {title}
                  </li>
                );
              })}
            </ol>
          </>
        ) : null}
      </div>
    </div>
  );
}
