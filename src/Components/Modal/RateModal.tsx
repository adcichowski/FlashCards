import { useMemo, useState } from "react";
import { useModalContext } from "../../Context/ModalContext";
import { Button } from "../Button/Button";
import styles from "./Modal.module.scss";
import { ReactComponent as Star } from "../../Assets/Icons/star.svg";
function RateModal() {
  const maxRateOnCard = 5;
  const minRateOnCard = 1;
  const { dispatch, state } = useModalContext();
  const [rateValue, setRateValue] = useState(useMemo(() => 1, []));
  const handleClose = () => {
    dispatch({ type: "closeModal" });
  };
  if (!state.isOpen) {
    return null;
  }
  const setYourRateCard = {
    add: () =>
      setRateValue(rateValue === maxRateOnCard ? rateValue : rateValue + 1),
    subtract: () =>
      setRateValue(rateValue === minRateOnCard ? rateValue : rateValue - 1),
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>Rate Card</p>
        <div className={styles.blockButton}>
          <button
            className={styles.rateButton}
            onClick={() => setYourRateCard.subtract()}
          >
            -
          </button>
          <div className={styles.modalIcon}>
            <Star />
          </div>
          <button
            className={styles.rateButton}
            onClick={() => setYourRateCard.add()}
          >
            +
          </button>
        </div>
        <span className={styles.rateNumber}>{rateValue}</span>
        <p className={styles.modalText}>
          If the card overall will be smaller than 2.7 will be deleted!
        </p>
        <div className={styles.blockButton}>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
          <Button type="button" onClick={handleClose}>
            Rate
          </Button>
        </div>
      </div>
    </div>
  );
}
export { RateModal };
RateModal.displayName = "RateModal";
