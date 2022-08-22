import { Dispatch } from "react";
import { useReducer } from "react";
import { createContext, ReactNode } from "react";
import { useContext } from "react";

interface Action {
  readonly type: "logIn" | "logOut";
  readonly setUser?: Omit<CurrentUser, "isLogin">;
}
export interface CurrentUser {
  readonly idUser: string;
  readonly isLogin: boolean;
}
function userReducer(state: CurrentUser, action: Action): CurrentUser {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        ...action.setUser,
        isLogin: true,
      };
    case "logOut":
      return { ...state, isLogin: false, idUser: "" };
    default: {
      throw new Error(`Unhandled action type in AuthContext`);
    }
  }
}

const AuthContext = createContext<{ readonly state: CurrentUser; readonly dispatch: Dispatch<Action> } | undefined>(
  undefined,
);
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
const AuthProvider = ({ children }: { readonly children: ReactNode }) => {
  const currentUser: CurrentUser = {
    isLogin: false,
    idUser: "",
  };
  const [state, dispatch] = useReducer(userReducer, currentUser);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, useAuthContext };
