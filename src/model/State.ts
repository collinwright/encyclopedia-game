import { ArticlePair } from "../external/wikimedia";

export interface State {
  course: ArticlePair | null;
  visited: string[];
  loading: boolean;
}

export const emptyState = (): State => ({
  course: null,
  visited: [],
  loading: false
});
