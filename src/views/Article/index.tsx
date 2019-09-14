import * as React from "react";

import "./Article.css";

const titleToPathname = (title: string) =>
  `/wiki/${encodeURIComponent(title.replace(new RegExp(" ", "g"), "_"))}`;

const pathnameToTitle = (pathname: string) => {
  const lastSlash = pathname.lastIndexOf("/");
  const encodedTitle = pathname.substring(lastSlash + 1);
  return decodeURIComponent(encodedTitle).replace(new RegExp("_", "g"), " ");
};

export default (props: {
  startingTitle: string;
  onNewArticle?: (title: string) => unknown;
}) => {
  return (
    <iframe
      className="wikimedia-article"
      src={titleToPathname(props.startingTitle)}
      onLoad={event => {
        const contentWindow =
          event.currentTarget && event.currentTarget.contentWindow;
        if (props.onNewArticle != null && contentWindow != null) {
          props.onNewArticle(pathnameToTitle(contentWindow.location.pathname));
        }
      }}
    ></iframe>
  );
};
