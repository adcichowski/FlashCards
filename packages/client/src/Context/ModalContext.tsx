import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext, useContext } from "react";

export interface ModalProps {
  readonly type: "error" | "success" | "rate";
  readonly isOpen: boolean;
  readonly message: string | undefined;
}

// eslint-disable-next-line functional/no-mixed-type
type ModalActions = {
  readonly setModal: Dispatch<SetStateAction<ModalProps>>;
  readonly modal: ModalProps;
  // eslint-disable-next-line no-unused-vars
  readonly openModal: (modalProps: Omit<ModalProps, "isOpen">) => void;
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
  const openModal = (modalProps: Omit<ModalProps, "isOpen">) => setModal({ ...modalProps, isOpen: true });

  const [modal, setModal] = useState<ModalProps>(modalState);

  const value = { modal, setModal, openModal };
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
export { useModalContext, ModalProvider };
