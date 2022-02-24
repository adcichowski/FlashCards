import React from "react";
import styles from "./BackButton.module.scss";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
function BackButton({ pathTo }: { readonly pathTo?: string }) {
  const history = useHistory();
  const handleClickBack = () => history.goBack();

  return (
    <>
      {pathTo ? (
        <Link className={styles.backButton} to={pathTo} />
      ) : (
        <button className={styles.backButton} onClick={handleClickBack}></button>
      )}
    </>
  );
}
export { BackButton };
BackButton.displayName = "BackButton";
