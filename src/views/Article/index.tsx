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
  startingTitle: string | null;
  onNewArticle?: (title: string) => unknown;
}) => {
  return (
    <iframe
      className="wikimedia-article"
      src={
        props.startingTitle ? titleToPathname(props.startingTitle) : undefined
      }
      onLoad={event => {
        const contentWindow =
          event.currentTarget && event.currentTarget.contentWindow;
        if (
          props.onNewArticle != null &&
          contentWindow != null &&
          contentWindow.location.pathname != "blank"
        ) {
          props.onNewArticle(pathnameToTitle(contentWindow.location.pathname));
        }
      }}
    ></iframe>
  );
};
