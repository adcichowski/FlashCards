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
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
}
const MainContext = createContext<ContextType>({
  isLoading: false,
  setLoading: () => {},
  modal: {
    isOpen: false,
    type: "success",
    message: "",
  },
  setModal: () => {},
});
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
    isOpen: true,
    type: "success" as const,
    message: "",
  });
  return (
    <MainContext.Provider value={{ isLoading, setLoading, modal, setModal }}>
      {children}
    </MainContext.Provider>
  );
}
