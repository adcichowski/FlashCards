import styles from "./BackButton.module.scss";
import { useHistory } from "react-router";

export default function BackButton() {
  const history = useHistory();
  const handleClickBack = () => history.goBack();
  return (
    <div>
      <button onClick={handleClickBack} className={styles.backButton} />
    </div>
  );
}
