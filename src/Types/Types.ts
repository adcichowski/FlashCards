export interface UserData {
  email: string;
  password: string;
}
export interface ModalInterface {
  text: string;
  isLoading: boolean;
}
export interface Card {
  id: number;
  technology: string;
  answer: string;
  question: string;
  isFavorite: boolean;
  rating: number;
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
