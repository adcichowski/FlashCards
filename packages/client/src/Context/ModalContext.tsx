import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext, useContext } from "react";

export interface ModalProps {
  readonly type: "error" | "success" | "rate";
  readonly isOpen: boolean;
  readonly message: string | undefined;
}

type ModalActions = {
  readonly setModal: Dispatch<SetStateAction<ModalProps>>;
  readonly modal: ModalProps;
};
const ModalContext = createContext<ModalActions | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Error while reading context!");
  }

  return context;
};
function ModalProvider({ children }: { readonly children: ReactNode }) {
  const modalState: ModalProps = {
    isOpen: false,
    type: "success",
    message: "Something goes wrong!",
  };
  const [modal, setModal] = useState<ModalProps>(modalState);

  const value = { modal, setModal };
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
export { useModalContext, ModalProvider };
