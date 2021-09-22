import { MouseEventHandler } from "react";
import { Technologies } from "../Components/Pages/Game/useAvaibleTechnologies";

export type ITypeBoard = "personalCards" | "generalCards";
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
  technology: Technologies | "none";
  answer: string;
  question: string;
  isFavorite: boolean;
  randomSvgCard: number;
  whoRate: PersonRating[];
}

export interface AvaibleTechnologiesProperty {
  [index: string]: TechnologyProperty;
}

export interface TechnologyProperty {
  name: Technologies;
  type: string;
  description: string;
  render: React.FunctionComponent;
  fill: string;
}
export interface ButtonInterface {
  size: "big" | "small" | "normal";
  type: "submit" | "button" | "a";
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
}
export type ICardsFromFirestore = { [key: string]: ICard[] };
