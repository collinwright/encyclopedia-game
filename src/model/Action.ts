import { Course } from "./State";

export type Action =
  | { type: "DID_VISIT"; data: string }
  | { type: "BEGAN_LOADING_COURSE" }
  | { type: "LOADED_COURSE"; data: Course };
