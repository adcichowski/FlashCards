import { Button } from "../Button/Button";
import styles from "./Modal.module.scss";
import Alert from "./alert-circle.svg";
import Check from "./check-circle.svg";

import ReactDOM from "react-dom";

import { useModalPortal } from "./useModalPortal";
import { useModalContext } from "src/context/ModalContext";

export function Modal() {
  const { wrapperElement } = useModalPortal();
  const { modal, setModal } = useModalContext();

  if (!wrapperElement || !modal.isOpen) return <></>;

  return ReactDOM.createPortal(
    <dialog className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>{modal.type === "error" ? "Error" : "Success"}</p>
        <div className={styles.modalIcon}>{modal.type === "error" ? <Alert /> : <Check />}</div>
        <p className={styles.modalText}>{modal.message}</p>
        <Button size="normal" type="button" onClick={() => setModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))}>
          Close
        </Button>
      </div>
    </dialog>,
    wrapperElement,
  );
}
Modal.displayName = "Modal";
