import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
interface Action {
  type: "openModal" | "closeModal" | "successModal" | "errorModal";
  setModal?: Omit<ModalInterface, "isOpen" | "type">;
}
interface Dispatch {
  (action: Action): void;
}
interface ModalInterface {
  isOpen: boolean;
  type: "error" | "success";
  message: string;
}
const MainContext = createContext<
  undefined | { state: ModalInterface; dispatch: Dispatch }
>(undefined);
function modalMainReducer(
  state: ModalInterface,
  action: Action
): ModalInterface {
  switch (action.type) {
    case "openModal":
      return {
        ...state,
        ...action.setModal,
        isOpen: true,
      };
    case "closeModal":
      return {
        ...state,
        ...action.setModal,
        isOpen: false,
      };
    case "successModal":
      return {
        ...state,
        ...action.setModal,
        type: "success",
        isOpen: true,
      };
    case "errorModal":
      return {
        ...state,
        ...action.setModal,
        type: "error",
        isOpen: true,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
export default function MainProvider({ children }: { children: ReactNode }) {
  const Modal: ModalInterface = {
    isOpen: false,
    type: "success",
    message: "",
  };
  const [state, dispatch] = useReducer(modalMainReducer, Modal);
  const value = { state, dispatch };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
