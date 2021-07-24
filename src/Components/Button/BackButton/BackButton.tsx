import styles from "./BackButton.module.scss";
import { useHistory } from "react-router";
import { useCallback } from "react";

export default function BackButton() {
  const history = useHistory();
  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <div>
      <button onClick={handleClickBack} className={styles.backButton} />
    </div>
  );
}
