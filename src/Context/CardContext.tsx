import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
import { ICard } from "../Types/Types";
import { getRandomMinMax } from "../Utils/Utils";
interface Action {
  type:
    | "showCard"
    | "flipCard"
    | "getNextOrPrevCard"
    | "showEmptyCard"
    | "editingCard"
    | "resetDataCard"
    | "hideCard";
  setCard?: Omit<CardContextInterface, "isShow" | "randomSvgCard">;
}
interface Dispatch {
  (action: Action): void;
}
interface CardContextInterface extends ICard {
  isShow: boolean;
  isFlip: boolean;
  randomSvgCard: number;
}
const CardContext = createContext<
  undefined | { state: CardContextInterface; dispatch: Dispatch }
>(undefined);
function cardMainReducer(
  state: CardContextInterface,
  action: Action
): CardContextInterface {
  switch (action.type) {
    case "hideCard":
      return {
        ...state,
        ...action.setCard,
        isFlip: false,
        isShow: false,
      };
    case "showCard":
      return {
        ...state,
        ...action.setCard,
        randomSvgCard: getRandomMinMax(0, 10),
        isFlip: false,
        isShow: true,
      };
    case "flipCard":
      return {
        ...state,
        isFlip: !state.isFlip,
      };
    case "getNextOrPrevCard":
      return {
        ...state,
        ...action.setCard,
        randomSvgCard: getRandomMinMax(0, 10),
        isFlip: false,
        isShow: true,
      };
    case "editingCard":
      return {
        ...state,
        ...action.setCard,
        isShow: true,
      };
    case "showEmptyCard":
      return {
        ...state,
        isFlip: false,
        isShow: true,
      };
    case "resetDataCard":
      return {
        id: 0,
        technology: "none",
        isFlip: false,
        isShow: false,
        rating: 5,
        isFavorite: false,
        question: "",
        answer: "",
        randomSvgCard: 0,
        whoRate: [],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
function CardProvider({ children }: { children: ReactNode }) {
  const Card: CardContextInterface = {
    id: 0,
    technology: "none",
    isFlip: false,
    isShow: false,
    rating: 5,
    isFavorite: false,
    question: "",
    answer: "",
    randomSvgCard: 0,
    whoRate: [],
  };

  const [state, dispatch] = useReducer(cardMainReducer, Card);
  const value = { state, dispatch };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
export { CardProvider, useCardContext };
