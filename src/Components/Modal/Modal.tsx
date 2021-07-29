import { useMainContext } from "../../Context/MainContext";
import { Button } from "../Button/Button";
import styles from "./Modal.module.scss";
import { ReactComponent as Alert } from "../../Assets/Modal/alert-circle.svg";
import { ReactComponent as Check } from "../../Assets/Modal/check-circle.svg";
function Modal() {
  const { dispatch, state } = useMainContext();
  const handleClose = () => {
    dispatch({ type: "closeModal" });
  };
  if (!state.isOpen) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>
          {state.type === "error" ? "Error" : "Success"}
        </h3>
        <div className={styles.modalIcon}>
          {state.type === "error" ? <Alert /> : <Check />}
        </div>
        <p className={styles.modalText}>{state.message}</p>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </div>
  );
}
export { Modal };
