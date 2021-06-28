import { createContext, ReactNode, useState } from "react";
import { useContext } from "react";
interface CurrentUser {
  idUser: string;
  isLogin: boolean;
}

const GameContext = createContext<any | undefined>(undefined);
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setUser] = useState({
    isLogin: true,
    idUser: "",
  });

  return (
    <GameContext.Provider value={{ currentUser, setUser }}>
      {children}
    </GameContext.Provider>
  );
};
