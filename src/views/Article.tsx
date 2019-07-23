import * as React from "react";
import { Api } from "../wikimedia";

export default (props: { title: string }) => {
  let element: HTMLElement;
  let html: string;
  const tryToPopulate = () => {
    console.log(element, html);
    if (element != null && html != null) {
      element.innerHTML = html;
    }
  };

  const api = React.useContext(Api);
  const ref = React.useCallback(newElement => {
    element = newElement;
    tryToPopulate();
  }, []);
  React.useEffect(() => {
    const work = async () => {
      const page = await api.page(props.title);
      html = await page.html();
      tryToPopulate();
    };

    work();
  }, [props.title]);

  return <div ref={ref}></div>;
};
