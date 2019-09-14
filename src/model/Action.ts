import { Course } from "./State";

export type Action =
  | { type: "DID_VISIT"; data: string }
  | { type: "NEW_COURSE"; data: Course }
  | { type: "RESET" };
