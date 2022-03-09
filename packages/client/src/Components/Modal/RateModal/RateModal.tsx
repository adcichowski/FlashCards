import { useModalContext } from "../../../Context/ModalContext";
import { Button } from "../../Button/Button";
import styles from "../Modal.module.scss";
import Star from "../../../Assets/Icons/star.svg";
import { useRate } from "./useRate";
function RateModal() {
  const { dispatch, state } = useModalContext();
  const { rateCard, setYourRateCard, rateValue } = useRate();
  if (!state.isOpen) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>Rate Card</p>
        <div className={styles.blockButton}>
          <button className={styles.rateButton} onClick={() => setYourRateCard.subtract()}>
            -
          </button>
          <div className={styles.modalIcon}>
            <Star />
          </div>
          <button className={styles.rateButton} onClick={() => setYourRateCard.add()}>
            +
          </button>
        </div>
        <span className={styles.rateNumber}>{rateValue}</span>
        <p className={styles.modalText}>If the card overall will be smaller than 2 will be deleted!</p>
        <div className={styles.blockButton}>
          <Button size="normal" type="button" onClick={() => dispatch({ type: "closeModal" })}>
            Close
          </Button>
          <Button size="normal" onClick={rateCard} type="button">
            Rate
          </Button>
        </div>
      </div>
    </div>
  );
}
export { RateModal };
RateModal.displayName = "RateModal";
