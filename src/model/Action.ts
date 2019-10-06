import { ArticlePair } from "../external/wikimedia";

export type Action =
  | { type: "DID_VISIT"; data: { title: string; now: Date } }
  | { type: "BEGAN_LOADING_COURSE" }
  | { type: "LOADED_COURSE"; data: { course: ArticlePair; now: Date } }
  | { type: "CRITICAL_ERROR" };
