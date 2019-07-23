import * as React from "react";

const Context = React.createContext<Set<string>>(null);

export const LinkSet = (props: { links: string[]; children: any }) => {
  return (
    <Context.Provider value={new Set(props.links)}>
      {props.children}
    </Context.Provider>
  );
};

export const Link = (props: {
  text: string;
  onLinkSelected: () => unknown;
}) => <a onClick={() => props.onLinkSelected()} />;

export const LinkedText = (props: {
  children: string;
  onLinkSelected: (text: string) => unknown;
}) => {
  const links = React.useContext(Context);
  const ref = React.useCallback(span => {}, [
    props.children,
    props.onLinkSelected,
    links
  ]);

  return <span ref={ref}>{props.children}</span>;
};
