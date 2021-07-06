import { Dispatch } from "react";
import { useReducer } from "react";
import { createContext, ReactNode } from "react";
import { useContext } from "react";
interface Action {
  type: "logIn" | "logOut";
  setUser?: Omit<CurrentUser, "isLogin">;
}
interface CurrentUser {
  idUser: string;
  isLogin: boolean;
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
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AuthContext = createContext<
  { state: CurrentUser; dispatch: Dispatch<Action> } | undefined
>(undefined);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser: CurrentUser = {
    isLogin: false,
    idUser: "",
  };
  const [state, dispatch] = useReducer(userReducer, currentUser);
  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
