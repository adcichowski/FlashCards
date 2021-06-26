import { useMainContext } from "../../Context/MainContext";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";
import { ReactComponent as Alert } from "../../Assets/Modal/alert-circle.svg";
import { ReactComponent as Check } from "../../Assets/Modal/check-circle.svg";
export default function Modal() {
  const {
    modal,
    modal: { isOpen, type, message },
    setModal,
  } = useMainContext();
  const handleClose = () => {
    setModal({ ...modal, isOpen: false });
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>
          {type === "error" ? "Error" : "Success"}
        </h3>
        <div className={styles.modalIcon}>
          {type === "error" ? <Alert /> : <Check />}
        </div>
        <p className={styles.modalText}>{message}</p>
        <Button text="Close" onClickAction={handleClose} />
      </div>
    </div>
  );
}
