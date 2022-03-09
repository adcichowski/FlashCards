import { useModalContext } from "../../Context/ModalContext";
import { Button } from "../Button/Button";
import styles from "./Modal.module.scss";
import Alert from "../../Assets/Modal/alert-circle.svg";
import Check from "../../Assets/Modal/check-circle.svg";
import { RateModal } from "./RateModal/RateModal";
function Modal() {
  const { dispatch, state } = useModalContext();
  const handleClose = () => {
    dispatch({ type: "closeModal" });
  };
  if (!state.isOpen) {
    return null;
  }
  if (state.type === "rate") {
    return <RateModal />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>{state.type === "error" ? "Error" : "Success"}</p>
        <div className={styles.modalIcon}>{state.type === "error" ? <Alert /> : <Check />}</div>
        <p className={styles.modalText}>{state.message}</p>
        <Button size="normal" type="button" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
export { Modal };
Modal.displayName = "Modal";
