import { ReactNode, useReducer } from "react";
import { createContext, useContext } from "react";
interface Action {
  readonly type: "closeModal" | "successModal" | "errorModal" | "rateModal";
  readonly setModal?: Omit<IModal, "isOpen" | "type">;
}
interface Dispatch {
  (action: Action): void;
}
export interface IModal {
  readonly type: "error" | "success" | "rate";
  readonly isOpen: boolean;
  readonly message: string;
}
const ModalContext = createContext<
  undefined | { state: IModal; dispatch: Dispatch }
>(undefined);
function ModalReducer(state: IModal, action: Action): IModal {
  switch (action.type) {
    case "closeModal":
      return {
        ...state,
        message: "",
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
    case "rateModal":
      return {
        ...state,
        ...action.setModal,
        type: "rate",
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
  const Modal: IModal = {
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
