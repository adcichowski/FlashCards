import { Technologies } from "../components/Pages/Game/useAvaibleTechnologies";

export type ITypeBoard = "personalCards" | "generalCards" | "favoriteCards";
export interface UserData {
  readonly email: string;
  readonly password: string;
}

export interface PersonRating {
  readonly id: string;
  readonly rate: number;
}

export interface ICard {
  readonly id: number;
  readonly technology: Technologies | "none";
  readonly answer: string;
  readonly question: string;
  readonly isFavorite: boolean;
  readonly randomSvgCard: number;
  readonly whoRate: readonly PersonRating[];
}

export interface AvaibleTechnologiesProperty {
  readonly [index: string]: TechnologyProperty;
}

export interface TechnologyProperty {
  readonly name: Technologies;
  readonly type: string;
  readonly description: string;
  readonly render: React.FunctionComponent;
  readonly fill: string;
}

export type ButtonSize = "big" | "small" | "normal";

export type ICardsFromFirestore = { readonly [key: string]: readonly ICard[] };
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
