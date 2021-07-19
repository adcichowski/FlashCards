import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
import { Card } from "../Types";
interface Action {
  type: "showCard" | "hideCard" | "flipCard" | "setDataCard";
  setCard?: Omit<CardInterface, "isShow">;
}
interface Dispatch {
  (action: Action): void;
}
interface CardInterface extends Card {
  isShow: boolean;
  isFlip: boolean;
}
const CardContext = createContext<
  undefined | { state: CardInterface; dispatch: Dispatch }
>(undefined);
function modalMainReducer(state: CardInterface, action: Action): CardInterface {
  switch (action.type) {
    case "showCard":
      if (state.isShow) {
        return {
          ...state,
          ...action.setCard,
          isFlip: false,
        };
      }
      return {
        ...state,
        ...action.setCard,
        isFlip: false,
        isShow: !state.isShow,
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
  const Card: CardInterface = {
    id: 0,
    technology: "",
    isFlip: false,
    isShow: false,
    rating: 0,
    isFavorite: false,
    question: "",
    answer: "",
  };
  const [state, dispatch] = useReducer(modalMainReducer, Card);
  const value = { state, dispatch };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
