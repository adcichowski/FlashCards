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
const ModalContext = createContext<
  undefined | { state: ModalInterface; dispatch: Dispatch }
>(undefined);
function ModalReducer(state: ModalInterface, action: Action): ModalInterface {
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
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
function ModalProvider({ children }: { children: ReactNode }) {
  const Modal: ModalInterface = {
    isOpen: false,
    type: "success",
    message: "",
  };
  const [state, dispatch] = useReducer(ModalReducer, Modal);
  const value = { state, dispatch };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
export { useModalContext, ModalProvider };
