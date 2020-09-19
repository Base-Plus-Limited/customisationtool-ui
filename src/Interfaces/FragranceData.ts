export interface IFragranceData {
  question: string;
  answers: IFragranceAnswer[];
}

export interface IFragranceAnswer {
  answer: string;
  selected: boolean;
  id: FragranceAnswer;
}

export enum FragranceAnswer {
  Yes = 0,
  No = 1
}