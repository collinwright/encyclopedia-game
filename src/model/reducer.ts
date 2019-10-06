import { State, emptyState } from "./State";
import { Action } from "./Action";

export default (state: State, action: Action): State => {
  if (action.type === "DID_VISIT") {
    return {
      ...state,
      visited: [...state.visited, action.data.title],
      finishTime:
        state.course != null && action.data.title === state.course.end
          ? action.data.now
          : null
    };
  }

  if (action.type === "LOADED_COURSE") {
    return {
      ...state,
      loading: false,
      course: action.data.course,
      startingTime: action.data.now
    };
  }

  if (action.type === "BEGAN_LOADING_COURSE") {
    return { ...emptyState(), loading: true };
  }

  if (action.type === "CRITICAL_ERROR") {
    return emptyState();
  }

  return state;
};
