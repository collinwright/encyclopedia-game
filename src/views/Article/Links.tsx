import * as React from "react";

export const Context = React.createContext<string[]>([]);

export const LinkedText = (props: {
  children: string;
  onLinkSelected: (text: string) => unknown;
}) => {
  const links = React.useContext(Context);
  const elements = React.useMemo(() => {
    const indices = links
      .map(link => [props.children.indexOf(link), link])
      .sort((a: [number, string], b: [number, string]) => a[0] - b[0]);

    const elements = [];
    let offset = 0;

    indices.forEach(([index, link]: [number, string]) => {
      if (index > offset) {
        elements.push(props.children.substring(offset, index));
      }

      elements.push(
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            props.onLinkSelected(link);
          }}
        >
          {link}
        </a>
      );
      offset = index + link.length;
    });
    if (offset < props.children.length) {
      elements.push(props.children.substring(offset));
    }

    return elements;
  }, [props.children, props.onLinkSelected, links]);

  return <>{elements}</>;
};
