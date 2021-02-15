export interface IHeading {
  headingText: string;
  desktopText?: string;
  selected: boolean;
  id: HeadingIds;
}

export enum HeadingIds {
  Summary = 0,
  Selection = 1
}