export interface UserData {
  email: string;
  password: string;
}
export interface ModalInterface {
  text: string;
  isLoading: boolean;
}
export interface Card {
  technology: string;
  language: string;
  answer: string;
  question: string;
  isFavorite: boolean;
}
export interface AvaibleTechnologiesProperty {
  [key: string]: TechnologyProperty;
}
export interface TechnologyProperty {
  name: string;
  render: React.ComponentType;
  fill: string;
}
