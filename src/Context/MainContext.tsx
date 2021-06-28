import { ReactNode } from "react";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface Modal {
  isOpen: boolean;
  type: "error" | "success";
  message: string;
}
interface ContextType {
  modal: Modal;
  isLoading: boolean;
  setModal: Dispatch<SetStateAction<Modal>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const MainContext = createContext<ContextType | undefined>(undefined);
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
export default function MainProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState<Modal>({
    isOpen: false,
    type: "success" as const,
    message: "",
  });
  return (
    <MainContext.Provider value={{ isLoading, setLoading, modal, setModal }}>
      {children}
    </MainContext.Provider>
  );
}
