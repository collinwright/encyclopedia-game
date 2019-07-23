export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SectionData {
  title: string;
  content: string;
  items?: SectionData[];
}
