export interface State {
  course: Course | null;
  visited: string[];
  loading: boolean;
}

export interface Course {
  start: string;
  end: string;
}

export const emptyState = (): State => ({
  course: null,
  visited: [],
  loading: false
});
