import { ArticlePair } from "../external/wikimedia";

export type Action =
  | { type: "DID_VISIT"; data: string }
  | { type: "BEGAN_LOADING_COURSE" }
  | { type: "LOADED_COURSE"; data: ArticlePair }
  | { type: "CRITICAL_ERROR" };
