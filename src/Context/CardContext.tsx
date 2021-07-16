import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
interface Action {
  type: "showCard" | "hideCard" | "flipCard" | "setDataCard";
  setCard?: Omit<CardInterface, "isShow" | "isFlip">;
}
interface Dispatch {
  (action: Action): void;
}
interface CardInterface {
  isShow: boolean;
  isFlip: boolean;
  question: string;
  answer: string;
}
const CardContext = createContext<
  undefined | { state: CardInterface; dispatch: Dispatch }
>(undefined);
function modalMainReducer(state: CardInterface, action: Action): CardInterface {
  switch (action.type) {
    case "showCard":
      return {
        ...state,
        ...action.setCard,
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
    case "setDataCard":
      return {
        ...state,
        ...action.setCard,
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
    isShow: false,
    isFlip: false,
    question: "",
    answer: "",
  };
  const [state, dispatch] = useReducer(modalMainReducer, Card);
  const value = { state, dispatch };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
