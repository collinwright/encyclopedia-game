import { Course } from "./State";

export type Action =
  | { type: "DID_VISIT"; data: string }
  | { type: "LOADING_COURSE" }
  | { type: "NEW_COURSE"; data: Course };
