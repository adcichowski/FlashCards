import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
import { ICard } from "../Types/Types";
import { getRandomMinMax } from "../Utils/Utils";
interface Action {
  readonly type:
    | "showCard"
    | "flipCard"
    | "getNextOrPrevCard"
    | "showEmptyCard"
    | "editCard"
    | "randomSVG"
    | "resetCard"
    | "hideCard";
  readonly setCard?: Omit<CardContextInterface, "isShow" | "randomSvgCard">;
}
interface Dispatch {
  // eslint-disable-next-line no-unused-vars
  (action: Action): void;
}
interface CardContextInterface extends ICard {
  readonly isShow: boolean;
  readonly isFlip: boolean;
  readonly randomSvgCard: number;
}
const CardContext = createContext<undefined | { readonly state: CardContextInterface; readonly dispatch: Dispatch }>(
  undefined,
);
function cardMainReducer(state: CardContextInterface, action: Action): CardContextInterface {
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
        isFlip: false,
        isShow: true,
      };
    case "flipCard":
      return {
        ...state,
        isFlip: !state.isFlip,
      };
    case "randomSVG":
      return {
        ...state,
        randomSvgCard: getRandomMinMax(0, 10),
      };
    case "getNextOrPrevCard":
      return {
        ...state,
        ...action.setCard,
        isFlip: false,
        isShow: true,
      };
    case "editCard":
      return {
        ...state,
        ...action.setCard,
      };
    case "showEmptyCard":
      return {
        ...state,
        isFlip: false,
        isShow: true,
      };
    case "resetCard":
      return {
        id: 0,
        technology: "none",
        isFlip: false,
        isShow: false,
        isFavorite: false,
        question: "",
        answer: "",
        randomSvgCard: 0,
        whoRate: [],
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
function CardProvider({ children }: { readonly children: ReactNode }) {
  const Card: CardContextInterface = {
    id: 0,
    technology: "none",
    isFlip: false,
    isShow: false,
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
