import { State, emptyState } from "./State";
import { Action } from "./Action";

export default (state: State, action: Action): State => {
  if (action.type === "DID_VISIT") {
    return { ...state, visited: [...state.visited, action.data] };
  }

  if (action.type === "LOADED_COURSE") {
    return { ...state, loading: false, course: action.data };
  }

  if (action.type === "BEGAN_LOADING_COURSE") {
    return { ...emptyState(), loading: true };
  }

  return state;
};
