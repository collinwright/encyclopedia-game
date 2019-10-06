import { ArticlePair } from "../external/wikimedia";

export interface State {
  course: undefined | null | ArticlePair;
  startingTime: undefined | null | Date;
  finishTime: undefined | null | Date;
  visited: string[];
  loading: boolean;
}

export const emptyState = (): State => ({
  course: null,
  startingTime: null,
  finishTime: null,
  visited: [],
  loading: false
});
