import * as React from "react";
import wiki from "wikijs";

export const Api = React.createContext(undefined);

export const Server = (props: { apiUrl: string; children: any }) => {
  const api = React.useMemo(() => wiki({ apiUrl: props.apiUrl }), []);
  return <Api.Provider value={api}>{props.children}</Api.Provider>;
};
