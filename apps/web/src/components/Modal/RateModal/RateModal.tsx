import { useModalContext } from "../../../context/ModalContext";
import { Button } from "../../Button/Button";
import styles from "../Modal.module.scss";
import Star from "./star.svg";
function RateModal() {
  const { modal, setModal } = useModalContext();

  if (!modal.isOpen) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>Rate Card</p>
        <div className={styles.blockButton}>
          <button className={styles.rateButton}>-</button>
          <div className={styles.modalIcon}>
            <Star />
          </div>
          <button className={styles.rateButton}>+</button>
        </div>
        <span className={styles.rateNumber}>{"TODO: CHANGE FUNCTIONALITY"}</span>
        <p className={styles.modalText}>If the card overall will be smaller than 2 will be deleted!</p>
        <div className={styles.blockButton}>
          <Button size="normal" type="button" onClick={() => setModal({ ...modal, isOpen: false })}>
            Close
          </Button>
          <Button size="normal" type="button">
            Rate
          </Button>
        </div>
      </div>
    </div>
  );
}
export { RateModal };
RateModal.displayName = "RateModal";
