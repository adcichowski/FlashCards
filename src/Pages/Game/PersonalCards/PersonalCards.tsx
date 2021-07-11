import { ReactComponent as Heart } from "../../../Assets/Icons/heart.svg";
import { ReactComponent as Plus } from "../../../Assets/Icons/plus.svg";
import styles from "./Personal.module.scss";
import IconTech from "../../../Components/Pages/Game/IconsTech/IconTech";
import { Link } from "react-router-dom";
import { useGameContext } from "../../../Context/GameContext";
export default function PersonalCards() {
  const {
    state: { personalCards },
  } = useGameContext();
  return (
    <div className={styles.personalBoard}>
      <h3 className={styles.personalTitle}>Personal Cards</h3>
      <div className={styles.personalTechnology}>
        <IconTech arrayCard={personalCards} />
      </div>
      <div className={styles.buttons}>
        <div className={styles.outsideButton}>
          Favorite Cards
          <Link to="/game/personal-cards/favorite" className={styles.link}>
            <Heart />
          </Link>
        </div>
        <div className={styles.outsideButton}>
          Create Card
          <Link to="/game/personal-cards/add" className={styles.link}>
            <Plus />
          </Link>
        </div>
      </div>
    </div>
  );
}
