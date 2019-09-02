import * as React from "react";

import "./Article.css";

export default (props: {
  startingTitle: string;
  onNewArticle?: (title: string) => unknown;
}) => {
  return (
    <iframe
      className="wikimedia"
      src={`/wiki/${props.startingTitle}`}
      onLoad={event => {
        const contentWindow =
          event.currentTarget && event.currentTarget.contentWindow;
        if (props.onNewArticle != null && contentWindow != null) {
          props.onNewArticle(contentWindow.location.pathname);
        }
      }}
    ></iframe>
  );
};
