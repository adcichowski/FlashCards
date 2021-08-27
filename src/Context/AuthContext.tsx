import { Dispatch } from "react";
import { useReducer } from "react";
import { createContext, ReactNode } from "react";
import { useContext } from "react";
import { auth } from "../lib/firebase/Settings";
import { ICard } from "../Types/Types";

interface Action {
  type: "logIn" | "logOut" | "setDeckCard";
  setUser?: Omit<CurrentUser, "isLogin">;
}
export interface CurrentUser {
  idUser: any;
  isLogin: boolean;
  personalCards: { [index: string]: ICard[] };
  generalCards: { [index: string]: ICard[] };
}
function userReducer(state: CurrentUser, action: Action): CurrentUser {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        ...action.setUser,
        isLogin: true,
      };
    case "setDeckCard":
      return {
        ...state,
        ...action.setUser,
      };

    case "logOut":
      auth.signOut();
      return { ...state, isLogin: false, idUser: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AuthContext = createContext<
  { state: CurrentUser; dispatch: Dispatch<Action> } | undefined
>(undefined);
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser: CurrentUser = {
    isLogin: false,
    idUser: "",
    personalCards: {},
    generalCards: {},
  };
  const [state, dispatch] = useReducer(userReducer, currentUser);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, useAuthContext };
