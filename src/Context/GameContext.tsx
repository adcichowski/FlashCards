import { Dispatch } from "react";
import { SetStateAction } from "react";
import { createContext, ReactNode, useState } from "react";
import { useContext } from "react";
interface CurrentUser {
  idUser: string;
  isLogin: boolean;
}
interface ContextType {
  currentUser: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser>>;
}

const GameContext = createContext<ContextType | undefined>(undefined);
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setUser] = useState<CurrentUser>({
    isLogin: false,
    idUser: "",
  });

  return (
    <GameContext.Provider value={{ currentUser, setUser }}>
      {children}
    </GameContext.Provider>
  );
};
