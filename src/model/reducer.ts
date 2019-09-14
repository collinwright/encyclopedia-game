import { State, emptyState } from "./State";
import { Action } from "./Action";

export default (state: State, action: Action): State => {
  if (action.type === "DID_VISIT") {
    return { ...state, visited: [...state.visited, action.data] };
  }

  if (action.type === "NEW_COURSE") {
    return { ...state, course: action.data };
  }

  if (action.type === "RESET") {
    return emptyState();
  }

  return state;
};
