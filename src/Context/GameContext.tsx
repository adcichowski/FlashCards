import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useContext } from "react";
interface GameContextInterface {
  setLogin: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  isLoading: boolean;
}
const GameContext = createContext<GameContextInterface | undefined>(undefined);
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("Error while reading context!");
  }
  return context;
};
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  return (
    <GameContext.Provider value={{ isLogin, setLoading, isLoading, setLogin }}>
      {children}
    </GameContext.Provider>
  );
};
