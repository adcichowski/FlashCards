import styles from "./BackButton.module.scss";
import { useHistory } from "react-router";
import { useCallback } from "react";
import { Link } from "react-router-dom";
function BackButton({ pathTo }: { pathTo?: string }) {
  const history = useHistory();
  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <>
      {!!pathTo ? (
        <Link className={styles.backButton} to={pathTo}></Link>
      ) : (
        <button
          className={styles.backButton}
          onClick={handleClickBack}
        ></button>
      )}
    </>
  );
}
export { BackButton };
BackButton.displayName = "BackButton";
