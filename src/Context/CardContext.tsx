import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
import { Card } from "../Types";
import { getRandomMinMax } from "../Utils/Utils";
interface Action {
  type: "showCard" | "hideCard" | "flipCard" | "setDataCard" | "nextCard";
  setCard?: Omit<CardContextInterface, "isShow" | "randomSvgCard">;
}
interface Dispatch {
  (action: Action): void;
}
interface CardContextInterface extends Card {
  isShow: boolean;
  isFlip: boolean;
  randomSvgCard: number;
}
const CardContext = createContext<
  undefined | { state: CardContextInterface; dispatch: Dispatch }
>(undefined);
function modalMainReducer(
  state: CardContextInterface,
  action: Action
): CardContextInterface {
  switch (action.type) {
    case "showCard":
      return {
        ...state,
        ...action.setCard,
        randomSvgCard: getRandomMinMax(0, 10),
        isFlip: false,
        isShow: true,
      };
    case "hideCard":
      return {
        ...state,
        isShow: false,
      };
    case "flipCard":
      return {
        ...state,
        isFlip: !state.isFlip,
      };
    case "nextCard":
      return {
        ...state,
        ...action.setCard,
        randomSvgCard: getRandomMinMax(0, 10),
        isFlip: false,
        isShow: true,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
export default function CardProvider({ children }: { children: ReactNode }) {
  const Card: CardContextInterface = {
    id: 0,
    technology: "",
    isFlip: false,
    isShow: false,
    rating: 0,
    isFavorite: false,
    question: "",
    answer: "",
    randomSvgCard: 0,
  };
  const [state, dispatch] = useReducer(modalMainReducer, Card);
  const value = { state, dispatch };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
