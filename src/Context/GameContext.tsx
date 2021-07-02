import { Dispatch } from "react";
import { useReducer } from "react";
import { createContext, ReactNode } from "react";
import { useContext } from "react";

interface Action {
  type: "setData" | "sendData";
  setData: UserData;
}
interface UserData {
  personalCards: object[];
  generalCards?: object[];
}
function userReducer(state: UserData, action: Action): UserData {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        ...action.setData,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const GameContext = createContext<
  { state: UserData; dispatch: Dispatch<Action> } | undefined
>(undefined);
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const userData: UserData = {
    personalCards: [],
    generalCards: [],
  };
  const [state, dispatch] = useReducer(userReducer, userData);
  const value = { state, dispatch };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
