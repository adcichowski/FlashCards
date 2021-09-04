import { MouseEventHandler } from "react";

export interface UserData {
  email: string;
  password: string;
}

export interface PersonRating {
  id: string;
  rate: number;
}

export interface ICard {
  id: number;
  technology: string;
  answer: string;
  question: string;
  isFavorite: boolean;
  rating: number;
  randomSvgCard: number;
  whoRate: PersonRating[];
}

export interface AvaibleTechnologiesProperty {
  [key: string]: TechnologyProperty;
}

export interface TechnologyProperty {
  name: string;
  type: string;
  description: string;
  render: React.FunctionComponent;
  fill: string;
}
export interface ButtonInterface {
  type: "submit" | "button" | "a";
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
}
export interface ICardsFromFirestore {
  [index: string]: ICard[];
}
